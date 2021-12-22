import sequelize from "../sequelize"

import User from "../models/User"
import mail from "./mail.service"

const randomCode = (digits: number = 4): string => {
	const code = Array(digits).fill(0)
	return code.map((_) => Math.floor(Math.random() * 10)).join("")
}

export const checkVerificationCode = (user: User, verificationCode: string) => {
	return user._attributes.verifiedCode == verificationCode
}

export const sendVerificationMail = async (user: User) => {
	const { isVerified, verifiedEmail } = user._attributes

	if (isVerified) {
		return "verifiedEmail Approved"
	}

	if (!verifiedEmail) {
		return "verificationEmail Not Found"
	}

	const t = await sequelize.transaction()
	const verifiedCode = randomCode()

	try {
		const [isSent, _] = await Promise.all([
			//
			await mail.sendMail({ to: verifiedEmail }),
			await user.update({ verifiedCode: verifiedCode, isVerified: false }, { transaction: t }),
		])

		if (!isSent) {
			await t.rollback()
			return "mail Not Sent"
		}

		await t.commit()
		return "mail Sent"
	} catch (err) {
		console.error(err)
		await t.rollback()
	}
}
