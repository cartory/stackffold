import sequelize from '../utils/sequelize'
import { Model, DataTypes } from 'sequelize'

export interface IPlaceType {

export class PlaceType extends Model<IPlaceType> { }

PlaceType.init({
	name: {
}, {
