import sequelize from "../utils/sequelize"
import { Model, DataTypes } from "sequelize"

export interface ICareer {
	id?: number
	creationDate: string
	code: string
	name: string
	duration: number
	educationLevel: string
	academicTitle: string
	midTitle: string
	nationalTitle: string
	fax: string
	email: string
	blog?: string
	location?: string
	web?: string
	Placeid?: number
}

export class Career extends Model<ICareer> {}

Career.init(
	{
		id: {
			key: "id",
			type: DataTypes.INTEGER({ length: 11 }),
			primaryKey: true,
			autoIncrement: true,
			autoIncrementIdentity: true,
		},
		creationDate: {
			key: "creationDate",
			type: DataTypes.DATE,
		},
		code: {
			key: "code",
			type: DataTypes.STRING(10),
			unique: true,
		},
		name: {
			key: "name",
			type: DataTypes.STRING(100),
		},
		duration: {
			key: "duration",
			type: DataTypes.TINYINT,
		},
		educationLevel: {
			key: "educationLevel",
			type: DataTypes.STRING(100),
		},
		academicTitle: {
			key: "academicTitle",
			type: DataTypes.STRING(100),
		},
		midTitle: {
			key: "midTitle",
			type: DataTypes.STRING(100),
		},
		nationalTitle: {
			key: "nationalTitle",
			type: DataTypes.STRING(100),
		},
		fax: {
			key: "fax",
			type: DataTypes.STRING(20),
		},
		email: {
			key: "email",
			type: DataTypes.STRING(100),
		},
		blog: {
			key: "blog",
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		location: {
			key: "location",
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		web: {
			key: "web",
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		Placeid: {
			key: "Placeid",
			type: DataTypes.INTEGER({ length: 11 }),
			allowNull: true,
			references: { key: "id", model: "Place" },
		},
	},
	{
		sequelize,
		tableName: "Career",
		deletedAt: true,
		timestamps: true,
		defaultScope: {
			attributes: {
				exclude: ["Placeid"],
			},
		},
	}
)
