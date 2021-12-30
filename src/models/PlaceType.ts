import sequelize from '../utils/sequelize'
import { Model, DataTypes } from 'sequelize'

export interface IPlaceType {	id?: number	name: string}

export class PlaceType extends Model<IPlaceType> { }

PlaceType.init({	id: {		key: 'id',		type: DataTypes.INTEGER({ length: 10 }),		primaryKey: true,		autoIncrement: true,		autoIncrementIdentity: true,	},
	name: {		key: 'name',		type: DataTypes.STRING(50),		unique: true,	},
}, {	sequelize, 	tableName: 'PlaceType', 	deletedAt: true,	timestamps: true, })

