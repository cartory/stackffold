import { User } from '../models/User'
import { Task } from '../models/Task'
import { Type } from '../models/Type'
import { Unit } from '../models/Unit'
import { Place } from '../models/Place'
import { Reason } from '../models/Reason'
import { Movement } from '../models/Movement'
import { User_Task } from '../models/User_Task'
import { Equipment } from '../models/Equipment'
import { User_Place } from '../models/User_Place'
import { Place_Place } from '../models/Place_Place'

// PLACE
Place.belongsToMany(Place, { through: Place_Place, foreignKey: 'placeChild_id', as: 'supPlaces' })
Place.belongsToMany(Place, { through: Place_Place, foreignKey: 'placeParent_id', as: 'places' })

Place.hasMany(Equipment, { foreignKey: 'Placeid',as: 'equipments' })
Equipment.belongsTo(Place, { foreignKey: 'Placeid',as: 'place' })

Place.belongsTo(Type, { foreignKey: 'Typeid', as: 'type' })
Type.hasMany(Place, { foreignKey: 'Typeid', as: 'places' })

Place.hasMany(Task, { foreignKey: 'Placeid', as: 'tasks' })
Task.belongsTo(Place, { foreignKey: 'Placeid', as: 'place' })

Place.belongsToMany(User, { through: User_Place, foreignKey: 'Userid', as: 'users' })
User.belongsToMany(Place, { through: User_Place, foreignKey: 'Placeid', as: 'places' })

// USER
User.belongsToMany(Task, { through: User_Task, foreignKey: 'Taskid', as: 'tasks' })
Task.belongsToMany(User, { through: User_Task, foreignKey: 'Userid', as: 'users' })

// MOVEMENT
Movement.belongsTo(User, { foreignKey: 'Userid', as: 'user' })
User.hasMany(Movement, { foreignKey: 'Userid', as: 'movements' })

Movement.belongsTo(Reason, { foreignKey: 'Reasonid', as: 'reason' })
Reason.hasMany(Movement, { foreignKey: 'Reasonid', as: 'movements' })

Movement.belongsTo(Equipment, { foreignKey: 'Equipmentid', as: 'equipment' })
Equipment.hasMany(Movement, { foreignKey: 'Equipmentid', as: 'movements' })

Movement.belongsTo(Place, { foreignKey: 'placeFrom_id', as: 'placeFrom' })
Place.hasMany(Movement, { foreignKey: 'placeFrom_id', as: 'movementsFrom' })

Movement.belongsTo(Place, { foreignKey: 'placeTo_id', as: 'placeTo' })
Place.hasMany(Movement, { foreignKey: 'placeTo_id', as: 'movementsTo' })

// EQUIPMENT
Equipment.belongsTo(Unit, { foreignKey: 'Unitid', as: 'unit' })
Unit.hasMany(Equipment, { foreignKey: 'Unitid', as: 'equipments' })

export { 
	User,
	Task,
	Type,
	Unit,
	Place,
	Reason,
	Movement,
	User_Task,
	Equipment,
	User_Place,
	Place_Place,
}