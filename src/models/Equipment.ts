import sequelize from "../utils/sequelize"
import { Model, DataTypes } from "sequelize"

export interface IEquipment {
	id?: number
	description: string
	code: string
	photoUrl?: string
	state: string
	observations?: string
	Unitid: number
	Placeid?: number
	EquipmentBrandid: number
	EquipmentTypeid: number
}

export class Equipment extends Model<IEquipment> {}

Equipment.init(
	{
		id: {
			key: "id",
			type: DataTypes.INTEGER({ length: 11 }),
			primaryKey: true,
			autoIncrement: true,
			autoIncrementIdentity: true,
		},
		description: {
			key: "description",
			type: DataTypes.TEXT,
		},
		code: {
			key: "code",
			type: DataTypes.STRING(100),
			unique: true,
		},
		photoUrl: {
			key: "photoUrl",
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		state: {
			key: "state",
			type: DataTypes.STRING(50),
		},
		observations: {
			key: "observations",
			type: DataTypes.TEXT,
			allowNull: true,
		},
		Unitid: {
			key: "Unitid",
			type: DataTypes.INTEGER({ length: 11 }),
			references: { key: "id", model: "EquipmentUnit" },
		},
		Placeid: {
			key: "Placeid",
			type: DataTypes.INTEGER({ length: 10 }),
			allowNull: true,
			references: { key: "id", model: "Place" },
		},
		EquipmentBrandid: {
			key: "EquipmentBrandid",
			type: DataTypes.INTEGER({ length: 11 }),
			references: { key: "id", model: "EquipmentBrand" },
		},
		EquipmentTypeid: {
			key: "EquipmentTypeid",
			type: DataTypes.INTEGER({ length: 11 }),
			references: { key: "id", model: "EquipmentType" },
		},
	},
	{
		sequelize,
		tableName: "Equipment",
		deletedAt: true,
		timestamps: true,
		defaultScope: {
			attributes: {
				exclude: ["Unitid", "Placeid", "EquipmentBrandid", "EquipmentTypeid"],
			},
		},
	}
)
