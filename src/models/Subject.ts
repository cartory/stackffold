import sequelize from '../utils/sequelize'
import { Model, DataTypes } from 'sequelize'

export interface ISubject {	id?: number	code: string	name: string	HT: number	HP: number	HS: number	CR: number}

export class Subject extends Model<ISubject> { }

Subject.init({	id: {		key: 'id',		type: DataTypes.INTEGER({ length: 11 }),		primaryKey: true,		autoIncrement: true,		autoIncrementIdentity: true,	},
	code: {		key: 'code',		type: DataTypes.STRING(10),		unique: true,	},
	name: {		key: 'name',		type: DataTypes.STRING(100),	},
	HT: {		key: 'HT',		type: DataTypes.INTEGER({ length: 5 }),	},
	HP: {		key: 'HP',		type: DataTypes.INTEGER({ length: 5 }),	},
	HS: {		key: 'HS',		type: DataTypes.INTEGER({ length: 5 }),	},
	CR: {		key: 'CR',		type: DataTypes.INTEGER({ length: 5 }),	},
}, {	sequelize, 	tableName: 'Subject', 	deletedAt: true,	timestamps: true, })

