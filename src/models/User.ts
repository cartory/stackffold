import sequelize from '../utils/sequelize'
import { Model, DataTypes } from 'sequelize'

export interface IUser {	id: number	uid: string	name: string	email: string	verifiedEmail: string	photoUrl: string	password: string	phoneNumber: string	verifiedCode: string	isVerified: boolean}

export class User extends Model<IUser> { }

User.init({	id: {		key: 'id',		type: DataTypes.INTEGER({ length: 10 }),		primaryKey: true,		autoIncrement: true,		autoIncrementIdentity: true,	},
	uid: {		key: 'uid',		type: DataTypes.STRING(50),		unique: true,	},
	name: {		key: 'name',		type: DataTypes.STRING(50),	},
	email: {		key: 'email',		type: DataTypes.STRING(50),		unique: true,	},
	verifiedEmail: {		key: 'verifiedEmail',		type: DataTypes.STRING(50),		unique: true,		allowNull: true,	},
	photoUrl: {		key: 'photoUrl',		type: DataTypes.STRING(255),		allowNull: true,	},
	password: {		key: 'password',		type: DataTypes.STRING(255),	},
	phoneNumber: {		key: 'phoneNumber',		type: DataTypes.STRING(20),		allowNull: true,	},
	verifiedCode: {		key: 'verifiedCode',		type: DataTypes.STRING(10),		allowNull: true,	},
	isVerified: {		key: 'isVerified',		type: DataTypes.BOOLEAN,	},
}, {	sequelize, 	tableName: 'User', 	deletedAt: true,	timestamps: true, })

