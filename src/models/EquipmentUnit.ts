import sequelize from '../utils/sequelize'
import { Model, DataTypes } from 'sequelize'

export interface IEquipmentUnit {

export class EquipmentUnit extends Model<IEquipmentUnit> { }

EquipmentUnit.init({
	name: {
}, {
