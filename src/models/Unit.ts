import sequelize from '../sequelize'
import { Model, DataTypes } from 'sequelize'

interface IUnit {

class Unit extends Model<IUnit> { }

Unit.init({
	name: {
}, {

export default Unit