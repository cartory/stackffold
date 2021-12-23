import sequelize from '../sequelize'
import { Model, DataTypes } from 'sequelize'

export interface IMovement {	id: number	Reasonid: number	description: string	Equipmentid: number	placeFrom_id: number	placeTo_id: number}

export class Movement extends Model<IMovement> { }

Movement.init({	id: {		key: 'id',		type: DataTypes.INTEGER({ length: 11 }),		primaryKey: true,		autoIncrement: true,		autoIncrementIdentity: true,	},
	Reasonid: {		key: 'Reasonid',		type: DataTypes.INTEGER({ length: 11 }),	},
	description: {		key: 'description',		type: DataTypes.TEXT,		allowNull: true,	},
	Equipmentid: {		key: 'Equipmentid',		type: DataTypes.INTEGER({ length: 11 }),	},
	placeFrom_id: {		key: 'placeFrom_id',		type: DataTypes.INTEGER({ length: 10 }),		allowNull: true,	},
	placeTo_id: {		key: 'placeTo_id',		type: DataTypes.INTEGER({ length: 10 }),		allowNull: true,	},
}, {	sequelize, 	tableName: 'Movement', 	deletedAt: false,	timestamps: false, })

