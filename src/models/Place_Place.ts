import sequelize from '../sequelize'
import { Model, DataTypes } from 'sequelize'

export interface IPlace_Place {	placeParent_id: number	placeChild_id: number}

export class Place_Place extends Model<IPlace_Place> { }

Place_Place.init({	placeParent_id: {		key: 'placeParent_id',		type: DataTypes.INTEGER({ length: 10 }),		primaryKey: true,	},
	placeChild_id: {		key: 'placeChild_id',		type: DataTypes.INTEGER({ length: 10 }),		primaryKey: true,	},
}, {	sequelize, 	tableName: 'Place_Place', 	deletedAt: false,	timestamps: false, })

