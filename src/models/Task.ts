import sequelize from '../sequelize'
import { Model, DataTypes } from 'sequelize'

interface ITask {	id: number	name: string	description: string	deadLine: string	status: boolean	Placeid: number	photoUrl: string}

class Task extends Model<ITask> { }

Task.init({	id: {		key: 'id',		type: DataTypes.INTEGER({ length: 10 }),		primaryKey: true,		autoIncrement: true,		autoIncrementIdentity: true,	},
	name: {		key: 'name',		type: DataTypes.STRING(50),	},
	description: {		key: 'description',		type: DataTypes.STRING(255),	},
	deadLine: {		key: 'deadLine',		type: DataTypes.DATE,	},
	status: {		key: 'status',		type: DataTypes.BOOLEAN,	},
	Placeid: {		key: 'Placeid',		type: DataTypes.INTEGER({ length: 10 }),	},
	photoUrl: {		key: 'photoUrl',		type: DataTypes.STRING(255),	},
}, {	sequelize, 	tableName: 'Task', 	deletedAt: true,	timestamps: true, })

export default Task