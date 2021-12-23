import { Transaction } from "sequelize"
import sequelize, { transaction } from "../utils/sequelize"

import { IMovement, Movement } from "../models/Movement"

const makeTransaction = async (movement: IMovement, equipmentIDs: number[] = []) => {
	const movements: IMovement[] = equipmentIDs.map((equipmentID) => {
		return {
			...movement,
			Equipmentid: equipmentID,
		} as IMovement
	})

	return await transaction(async (t: Transaction) => {
		await Movement.bulkCreate(movements, { transaction: t })
	})
}

export default {
	makeTransaction
}
