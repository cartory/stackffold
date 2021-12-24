import sequelize from '../utils/sequelize'
import { Model, DataTypes } from 'sequelize'

export interface ISubject {	id: number	code: string	name: string	HT: number	HP: number	HS: number	CR: number	Careerid: number}

export class Subject extends Model<ISubject> { }

Subject.init({	id: {		key: 'id',		type: DataTypes.INTEGER({ length: 11 }),		primaryKey: true,	},
	code: {		key: 'code',		type: DataTypes.STRING(10),		unique: true,	},
	name: {		key: 'name',		type: DataTypes.STRING(100),	},
	HT: {		key: 'HT',		type: DataTypes.TINYNIT,	},
	HP: {		key: 'HP',		type: DataTypes.TINYNIT,	},
	HS: {		key: 'HS',		type: DataTypes.TINYNIT,	},
	CR: {		key: 'CR',		type: DataTypes.TINYNIT,	},
	Careerid: {		key: 'Careerid',		type: DataTypes.INTEGER({ length: 11 }),		allowNull: true,		references: { key: 'id', model: 'Career' },	},
}, {	sequelize, 	tableName: 'Subject', 	deletedAt: true,	timestamps: true, })

