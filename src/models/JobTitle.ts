import sequelize from '../utils/sequelize'
import { Model, DataTypes } from 'sequelize'

export interface IJobTitle {	id: number	name: string	description: string	supJopTitleId: number}

export class JobTitle extends Model<IJobTitle> { }

JobTitle.init({	id: {		key: 'id',		type: DataTypes.INTEGER({ length: 11 }),		primaryKey: true,	},
	name: {		key: 'name',		type: DataTypes.STRING(100),	},
	description: {		key: 'description',		type: DataTypes.TEXT,		allowNull: true,	},
	supJopTitleId: {		key: 'supJopTitleId',		type: DataTypes.INTEGER({ length: 11 }),		references: { key: 'id', model: 'JobTitle' },	},
}, {	sequelize, 	tableName: 'JobTitle', 	deletedAt: true,	timestamps: true, })

