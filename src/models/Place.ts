import sequelize from "../utils/sequelize"
import { Model, DataTypes } from "sequelize"

export interface IPlace {
	id?: number
	code: string
	name: string
	description?: string
	Typeid?: number
	photoUrl?: string
	places?: IPlace[]
}

export class Place extends Model<IPlace> {}

Place.init(
	{
		id: {
			key: "id",
			type: DataTypes.INTEGER({ length: 10 }),
			primaryKey: true,
			autoIncrement: true,
			autoIncrementIdentity: true,
		},
		code: {
			key: "code",
			type: DataTypes.STRING(20),
			unique: true,
		},
		name: {
			key: "name",
			type: DataTypes.STRING(255),
		},
		description: {
			key: "description",
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		Typeid: {
			key: "Typeid",
			type: DataTypes.INTEGER({ length: 10 }),
			references: { key: "id", model: "PlaceType" },
		},
		photoUrl: {
			key: "photoUrl",
			type: DataTypes.STRING(255),
			allowNull: true,
		},
	},
	{
		sequelize,
		tableName: "Place",
		deletedAt: true,
		timestamps: true,
		defaultScope: {
			attributes: {
				exclude: ["Typeid"],
			},
		},
	}
)
