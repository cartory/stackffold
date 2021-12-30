import sequelize from '../utils/sequelize'
import { Model, DataTypes } from 'sequelize'

export interface IEquipmentBrand {	id?: number	name: string}

export class EquipmentBrand extends Model<IEquipmentBrand> { }

EquipmentBrand.init({	id: {		key: 'id',		type: DataTypes.INTEGER({ length: 11 }),		primaryKey: true,		autoIncrement: true,		autoIncrementIdentity: true,	},
	name: {		key: 'name',		type: DataTypes.STRING(50),		unique: true,	},
}, {	sequelize, 	tableName: 'EquipmentBrand', 	deletedAt: true,	timestamps: true, })

