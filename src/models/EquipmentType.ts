import sequelize from '../utils/sequelize'
import { Model, DataTypes } from 'sequelize'

export interface IEquipmentType {

export class EquipmentType extends Model<IEquipmentType> { }

EquipmentType.init({
	name: {
}, {
