import sequelize from '../utils/sequelize'
import { Model, DataTypes } from 'sequelize'

export interface IEquipmentUnit {	id?: number	name: string}

export class EquipmentUnit extends Model<IEquipmentUnit> { }

EquipmentUnit.init({	id: {		key: 'id',		type: DataTypes.INTEGER({ length: 11 }),		primaryKey: true,		autoIncrement: true,		autoIncrementIdentity: true,	},
	name: {		key: 'name',		type: DataTypes.STRING(10),		unique: true,	},
}, {	sequelize, 	tableName: 'EquipmentUnit', 	deletedAt: true,	timestamps: true, })

