import sequelize from '../sequelize'
import { Model, DataTypes } from 'sequelize'

interface IUser_Place {	Userid: number	Placeid: number	startTime: number	endTime: number	startDate: string	endDate: string}

class User_Place extends Model<IUser_Place> { }

User_Place.init({	Userid: {		key: 'Userid',		type: DataTypes.INTEGER({ length: 10 }),		primaryKey: true,	},
	Placeid: {		key: 'Placeid',		type: DataTypes.INTEGER({ length: 10 }),		primaryKey: true,	},
	startTime: {		key: 'startTime',		type: DataTypes.INTEGER({ length: 5 }),	},
	endTime: {		key: 'endTime',		type: DataTypes.INTEGER({ length: 5 }),	},
	startDate: {		key: 'startDate',		type: DataTypes.DATE,	},
	endDate: {		key: 'endDate',		type: DataTypes.DATE,	},
}, {	sequelize, 	tableName: 'User_Place', 	deletedAt: false,	timestamps: false, })

export default User_Place