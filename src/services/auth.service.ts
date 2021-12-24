import mail from "./mail.service"

import { User } from "../utils/models"
import sequelize from "../utils/sequelize"

const randomCode = (digits: number = 4): string => {
	const code = Array(digits).fill(0)
	return code.map((_) => Math.floor(Math.random() * 10)).join("")
}

const checkVerificationCode = async (user: User, verificationCode: string) => {
	try {
		if (user._attributes.verifiedCode == verificationCode) {
			await user.update({ isVerified: true })
			return true
		}
	} catch (err) {
		console.error(err)
	}

	return false
}

const sendVerificationMail = async (user: User): Promise<string> => {
	const { isVerified, verifiedEmail } = user._attributes

	if (isVerified) {
		return "verifiedEmail Approved"
	}

	if (!verifiedEmail) {
		return "verificationEmail Not Found"
	}

	const verifiedCode = randomCode()

	try {
		const [isSent, _] = await sequelize.transaction((t) => {
			return Promise.all([
				//
				mail.sendMail({ to: verifiedEmail }),
				user.update({ verifiedCode: verifiedCode, isVerified: false }, { transaction: t }),
			])
		})

		if (!isSent) {
			return "mail Not Sent"
		}

		return "mail Sent"
	} catch (err) {
		console.error(err)
		return err.message
	}
}

export default {
	sendVerificationMail,
	checkVerificationCode,
}
