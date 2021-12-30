import sequelize from '../utils/sequelize'
import { Model, DataTypes } from 'sequelize'

export interface IMovementReason {	id?: number	name: string}

export class MovementReason extends Model<IMovementReason> { }

MovementReason.init({	id: {		key: 'id',		type: DataTypes.INTEGER({ length: 11 }),		primaryKey: true,		autoIncrement: true,		autoIncrementIdentity: true,	},
	name: {		key: 'name',		type: DataTypes.STRING(20),		unique: true,	},
}, {	sequelize, 	tableName: 'MovementReason', 	deletedAt: true,	timestamps: true, })

