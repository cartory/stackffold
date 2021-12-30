import sequelize from '../utils/sequelize'
import { Model, DataTypes } from 'sequelize'

export interface IRequirement {	id?: number	subjectReqId: number	subjectPreqId: number	Careerid: number}

export class Requirement extends Model<IRequirement> { }

Requirement.init({	id: {		key: 'id',		type: DataTypes.INTEGER({ length: 11 }),		primaryKey: true,		autoIncrement: true,		autoIncrementIdentity: true,	},
	subjectReqId: {		key: 'subjectReqId',		type: DataTypes.INTEGER({ length: 11 }),		references: { key: 'id', model: 'Subject' },	},
	subjectPreqId: {		key: 'subjectPreqId',		type: DataTypes.INTEGER({ length: 11 }),		references: { key: 'id', model: 'Subject' },	},
	Careerid: {		key: 'Careerid',		type: DataTypes.INTEGER({ length: 11 }),		references: { key: 'id', model: 'Career' },	},
}, {	sequelize, 	tableName: 'Requirement', 	deletedAt: false,	timestamps: false, })

