import { config } from "dotenv"
import { Sequelize, Transaction } from "sequelize"

config()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	logging: false,
	define: {
		paranoid: true,
		defaultScope: {
			attributes: {
				exclude: ["createdAt", "updatedAt", "deletedAt"],
			},
		},
	},
	pool: {
		idle: 10000,
		acquire: 3600000,
	},
})

export const transaction = async (callback: (t: Transaction) => Promise<void>): Promise<boolean> => {
	const t = await sequelize.transaction()
	try {
		await callback.call(t)
		await t.commit()
		return true
	} catch (err) {
		console.error(err)
		await t.rollback()
	}

	return false
}

export default sequelize
