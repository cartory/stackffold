import sequelize from '../sequelize'
import { Model, DataTypes } from 'sequelize'

export interface IEquipment {	id: number	description: string	code: string	photoUrl: string	state: string	observations: string	Unitid: number}

export class Equipment extends Model<IEquipment> { }

Equipment.init({	id: {		key: 'id',		type: DataTypes.INTEGER({ length: 11 }),		primaryKey: true,		autoIncrement: true,		autoIncrementIdentity: true,	},
	description: {		key: 'description',		type: DataTypes.TEXT,	},
	code: {		key: 'code',		type: DataTypes.STRING(100),		unique: true,	},
	photoUrl: {		key: 'photoUrl',		type: DataTypes.STRING(255),	},
	state: {		key: 'state',		type: DataTypes.STRING(50),	},
	observations: {		key: 'observations',		type: DataTypes.TEXT,	},
	Unitid: {		key: 'Unitid',		type: DataTypes.INTEGER({ length: 11 }),	},
}, {	sequelize, 	tableName: 'Equipment', 	deletedAt: true,	timestamps: true, })

