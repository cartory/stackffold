import sequelize from '../sequelize'
import { Model, DataTypes } from 'sequelize'

interface IType {	id: number	name: string}

class Type extends Model<IType> { }

Type.init({	id: {		key: 'id',		type: DataTypes.INTEGER({ length: 10 }),		primaryKey: true,		autoIncrement: true,		autoIncrementIdentity: true,	},
	name: {		key: 'name',		type: DataTypes.STRING(50),		unique: true,	},
}, {	sequelize, 	tableName: 'Type', 	deletedAt: true,	timestamps: true, })

export default Type