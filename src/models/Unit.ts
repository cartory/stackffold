import sequelize from '../utils/sequelize'
import { Model, DataTypes } from 'sequelize'

export interface IUnit {	id: number	name: string}

export class Unit extends Model<IUnit> { }

Unit.init({	id: {		key: 'id',		type: DataTypes.INTEGER({ length: 11 }),		primaryKey: true,		autoIncrement: true,		autoIncrementIdentity: true,	},
	name: {		key: 'name',		type: DataTypes.STRING(10),		unique: true,	},
}, {	sequelize, 	tableName: 'Unit', 	deletedAt: true,	timestamps: true, })

