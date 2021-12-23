import sequelize from '../utils/sequelize'
import { Model, DataTypes } from 'sequelize'

export interface IUser_Place {	Userid: number	Placeid: number	startTime: number	endTime: number	startDate: string	endDate: string}

export class User_Place extends Model<IUser_Place> { }

User_Place.init({	Userid: {		key: 'Userid',		type: DataTypes.INTEGER({ length: 10 }),		primaryKey: true,		references: { key: 'id', model: 'User' },	},
	Placeid: {		key: 'Placeid',		type: DataTypes.INTEGER({ length: 10 }),		primaryKey: true,		references: { key: 'id', model: 'Place' },	},
	startTime: {		key: 'startTime',		type: DataTypes.INTEGER({ length: 5 }),	},
	endTime: {		key: 'endTime',		type: DataTypes.INTEGER({ length: 5 }),	},
	startDate: {		key: 'startDate',		type: DataTypes.DATE,	},
	endDate: {		key: 'endDate',		type: DataTypes.DATE,	},
}, {	sequelize, 	tableName: 'User_Place', 	deletedAt: false,	timestamps: false, })

