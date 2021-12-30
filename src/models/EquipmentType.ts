import sequelize from '../utils/sequelize'
import { Model, DataTypes } from 'sequelize'

export interface IEquipmentType {	id?: number	name: string}

export class EquipmentType extends Model<IEquipmentType> { }

EquipmentType.init({	id: {		key: 'id',		type: DataTypes.INTEGER({ length: 11 }),		primaryKey: true,		autoIncrement: true,		autoIncrementIdentity: true,	},
	name: {		key: 'name',		type: DataTypes.STRING(50),		unique: true,	},
}, {	sequelize, 	tableName: 'EquipmentType', 	deletedAt: true,	timestamps: true, })

