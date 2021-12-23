import sequelize from '../utils/sequelize'
import { Model, DataTypes } from 'sequelize'

export interface IUser_Task {	Userid: number	Taskid: number	startDate: string	endDate: string}

export class User_Task extends Model<IUser_Task> { }

User_Task.init({	Userid: {		key: 'Userid',		type: DataTypes.INTEGER({ length: 10 }),		primaryKey: true,		references: { key: 'id', model: 'User' },	},
	Taskid: {		key: 'Taskid',		type: DataTypes.INTEGER({ length: 10 }),		primaryKey: true,		references: { key: 'id', model: 'Task' },	},
	startDate: {		key: 'startDate',		type: DataTypes.DATE,	},
	endDate: {		key: 'endDate',		type: DataTypes.DATE,	},
}, {	sequelize, 	tableName: 'User_Task', 	deletedAt: false,	timestamps: false, })

