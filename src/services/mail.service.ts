import nodemailer, { SendMailOptions } from "nodemailer"

const mailTransport = nodemailer.createTransport({
	service: process.env.MAIL_SERVICE,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS,
	},
	tls: {
		rejectUnauthorized: false,
	},
})

export const sendMail = async (mailOptions: SendMailOptions): Promise<boolean> => {
	try {
		const messageInfo = await mailTransport.sendMail({
			from: process.env.MAIL_USER,
			to: mailOptions.to,
			subject: mailOptions.subject,
			text: mailOptions.text,
		})

		console.table([messageInfo])
        return true
	} catch (err) {
		console.error(err)
	}
	return false
}
