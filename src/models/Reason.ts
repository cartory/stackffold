import sequelize from '../sequelize'
import { Model, DataTypes } from 'sequelize'

interface IReason {	id: number	name: string}

class Reason extends Model<IReason> { }

Reason.init({	id: {		key: 'id',		type: DataTypes.INTEGER({ length: 11 }),		primaryKey: true,		autoIncrement: true,		autoIncrementIdentity: true,	},
	name: {		key: 'name',		type: DataTypes.STRING(20),		unique: true,	},
}, {	sequelize, 	tableName: 'Reason', 	deletedAt: true,	timestamps: true, })

export default Reason