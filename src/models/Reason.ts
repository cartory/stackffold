import sequelize from '../sequelize'
import { Model, DataTypes } from 'sequelize'

interface IReason {

class Reason extends Model<IReason> { }

Reason.init({
	name: {
}, {

export default Reason