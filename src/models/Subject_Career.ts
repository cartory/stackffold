import sequelize from '../utils/sequelize'
import { Model, DataTypes } from 'sequelize'

export interface ISubject_Career {	Subjectid: number	Careerid: number	semester: number}

export class Subject_Career extends Model<ISubject_Career> { }

Subject_Career.init({	Subjectid: {		key: 'Subjectid',		type: DataTypes.INTEGER({ length: 11 }),		primaryKey: true,		references: { key: 'id', model: 'Subject' },	},
	Careerid: {		key: 'Careerid',		type: DataTypes.INTEGER({ length: 11 }),		primaryKey: true,		references: { key: 'id', model: 'Career' },	},
	semester: {		key: 'semester',		type: DataTypes.INTEGER({ length: 11 }),	},
}, {	sequelize, 	tableName: 'Subject_Career', 	deletedAt: false,	timestamps: false, })

