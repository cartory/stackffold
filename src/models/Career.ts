import sequelize from '../utils/sequelize'
import { Model, DataTypes } from 'sequelize'

export interface ICareer {	id: number	code: string	name: string	duration: number	level: number	academicTitle: string	midTitle: string	nationalTitle: string	fax: string	email: string	blog: string	location: string}

export class Career extends Model<ICareer> { }

Career.init({	id: {		key: 'id',		type: DataTypes.INTEGER({ length: 11 }),		primaryKey: true,	},
	code: {		key: 'code',		type: DataTypes.STRING(10),		unique: true,	},
	name: {		key: 'name',		type: DataTypes.STRING(100),	},
	duration: {		key: 'duration',		type: DataTypes.TINYNIT,	},
	level: {		key: 'level',		type: DataTypes.TINYNIT,	},
	academicTitle: {		key: 'academicTitle',		type: DataTypes.STRING(100),	},
	midTitle: {		key: 'midTitle',		type: DataTypes.STRING(100),	},
	nationalTitle: {		key: 'nationalTitle',		type: DataTypes.STRING(100),	},
	fax: {		key: 'fax',		type: DataTypes.STRING(20),	},
	email: {		key: 'email',		type: DataTypes.STRING(100),	},
	blog: {		key: 'blog',		type: DataTypes.STRING(255),		allowNull: true,	},
	location: {		key: 'location',		type: DataTypes.STRING(255),	},
}, {	sequelize, 	tableName: 'Career', 	deletedAt: true,	timestamps: true, })

