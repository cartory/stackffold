import sequelize from "../utils/sequelize"
import { QueryTypes, Transaction } from "sequelize"

import { IMovement } from "../models/Movement"

/**
 * Made with mySQL syntax
 * This function make the transaction with one SQL query for performance
 * @param movement is the movement for transaction
 * @param ids are the number of equipment for transaction for movement
 * @returns {Promise<boolean>} false if transaction fails
 */
const makeTransaction = async (movement: IMovement, ids: number[] = []): Promise<boolean> => {
	if (!ids.length) {
		return false
	}

	const COLUMNS = Object.keys(movement).join(",")
	const ROWS = ids.map((id) => `(${Object.values({ ...movement, Equipmentid: id } as IMovement).join(",")})`).join(",")

	const sqlInsert = `INSERT INTO Movement (${COLUMNS}) VALUES ${ROWS}`
	const sqlUpdate = `UPDATE Equipment SET Placeid = ${movement.placeTo_id} WHERE id IN (${ids.join(",")})`

	try {
		await sequelize.transaction((t: Transaction) => {
			return Promise.all([
				// INSERT && UPDATE
				sequelize.query(sqlInsert, { transaction: t, type: QueryTypes.INSERT }),
				sequelize.query(sqlUpdate, { transaction: t, type: QueryTypes.UPDATE }),
			])
		})

		return true
	} catch (err) {
		console.error(err)
	}

	return false
}

export default {
	makeTransaction,
}
