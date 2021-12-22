import sequelize from '../sequelize'
import { Model, DataTypes } from 'sequelize'

interface IUser {	id: number	uid: string	name: string	email: string	verifiedEmail: string	photoUrl: string	password: string	phoneNumber: string}

class User extends Model<IUser> { }

User.init({	id: {		key: 'id',		type: DataTypes.INTEGER({ length: 10 }),		primaryKey: true,		autoIncrement: true,		autoIncrementIdentity: true,	},
	uid: {		key: 'uid',		type: DataTypes.STRING(50),		unique: true,	},
	name: {		key: 'name',		type: DataTypes.STRING(50),	},
	email: {		key: 'email',		type: DataTypes.STRING(50),		unique: true,	},
	verifiedEmail: {		key: 'verifiedEmail',		type: DataTypes.STRING(50),		unique: true,	},
	photoUrl: {		key: 'photoUrl',		type: DataTypes.STRING(255),	},
	password: {		key: 'password',		type: DataTypes.STRING(255),	},
	phoneNumber: {		key: 'phoneNumber',		type: DataTypes.STRING(20),	},
}, {	sequelize, 	tableName: 'User', 	deletedAt: true,	timestamps: true, })

export default User