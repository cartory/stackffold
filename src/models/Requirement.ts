import sequelize from '../utils/sequelize'
import { Model, DataTypes } from 'sequelize'

export interface IRequirement {	subjectReqId: number	subjectPreqId: number	Careerid: number	semester: number}

export class Requirement extends Model<IRequirement> { }

Requirement.init({	subjectReqId: {		key: 'subjectReqId',		type: DataTypes.INTEGER({ length: 11 }),		primaryKey: true,		references: { key: 'id', model: 'Subject' },	},
	subjectPreqId: {		key: 'subjectPreqId',		type: DataTypes.INTEGER({ length: 11 }),		primaryKey: true,		references: { key: 'id', model: 'Subject' },	},
	Careerid: {		key: 'Careerid',		type: DataTypes.INTEGER({ length: 11 }),		references: { key: 'id', model: 'Career' },	},
	semester: {		key: 'semester',		type: DataTypes.TINYNIT,	},
}, {	sequelize, 	tableName: 'Requirement', 	deletedAt: false,	timestamps: false, })

