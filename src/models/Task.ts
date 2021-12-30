import sequelize from "../utils/sequelize"
import { Model, DataTypes } from "sequelize"

export interface ITask {
	id?: number
	name: string
	description?: string
	deadLine: string
	status: boolean
	Placeid?: number
	photoUrl?: string
}

export class Task extends Model<ITask> {}

Task.init(
	{
		id: {
			key: "id",
			type: DataTypes.INTEGER({ length: 10 }),
			primaryKey: true,
			autoIncrement: true,
			autoIncrementIdentity: true,
		},
		name: {
			key: "name",
			type: DataTypes.STRING(50),
		},
		description: {
			key: "description",
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		deadLine: {
			key: "deadLine",
			type: DataTypes.DATE,
		},
		status: {
			key: "status",
			type: DataTypes.BOOLEAN,
		},
		Placeid: {
			key: "Placeid",
			type: DataTypes.INTEGER({ length: 10 }),
			allowNull: true,
			references: { key: "id", model: "Place" },
		},
		photoUrl: {
			key: "photoUrl",
			type: DataTypes.STRING(255),
			allowNull: true,
		},
	},
	{
		sequelize,
		tableName: "Task",
		deletedAt: true,
		timestamps: true,
		defaultScope: {
			attributes: {
				exclude: ["Placeid"],
			},
		},
	}
)
