import sequelize from '../utils/sequelize'
import { Model, DataTypes } from 'sequelize'

export interface IMovementReason {

export class MovementReason extends Model<IMovementReason> { }

MovementReason.init({
	name: {
}, {
