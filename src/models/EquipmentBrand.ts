import sequelize from '../utils/sequelize'
import { Model, DataTypes } from 'sequelize'

export interface IEquipmentBrand {

export class EquipmentBrand extends Model<IEquipmentBrand> { }

EquipmentBrand.init({
	name: {
}, {
