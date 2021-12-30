import { User } from '../models/User'
import { Task } from '../models/Task'
import { Place } from '../models/Place'
import { Career } from '../models/Career'
import { Subject } from '../models/Subject'
import { Movement } from '../models/Movement'
import { JobTitle } from '../models/JobTitle'
import { User_Task } from '../models/User_Task'
import { PlaceType } from '../models/PlaceType'
import { Equipment } from '../models/Equipment'
import { User_Place } from '../models/User_Place'
import { Place_Place } from '../models/Place_Place'
import { Requirement } from '../models/Requirement'
import { EquipmentUnit } from '../models/EquipmentUnit'
import { EquipmentType } from '../models/EquipmentType'
import { MovementReason } from '../models/MovementReason'
import { EquipmentBrand } from '../models/EquipmentBrand'
import { Subject_Career } from '../models/Subject_Career'

// PLACE
Place.belongsToMany(Place, { through: Place_Place, foreignKey: 'placeChild_id', as: 'supPlaces' })
Place.belongsToMany(Place, { through: Place_Place, foreignKey: 'placeParent_id', as: 'places' })

Place.hasMany(Equipment, { foreignKey: 'Placeid',as: 'equipments' })
Equipment.belongsTo(Place, { foreignKey: 'Placeid',as: 'place' })

Place.belongsTo(PlaceType, { foreignKey: 'Typeid', as: 'type' })
PlaceType.hasMany(Place, { foreignKey: 'Typeid', as: 'places' })

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

Movement.belongsTo(MovementReason, { foreignKey: 'Reasonid', as: 'reason' })
MovementReason.hasMany(Movement, { foreignKey: 'Reasonid', as: 'movements' })

Movement.belongsTo(Equipment, { foreignKey: 'Equipmentid', as: 'equipment' })
Equipment.hasMany(Movement, { foreignKey: 'Equipmentid', as: 'movements' })

Movement.belongsTo(Place, { foreignKey: 'placeFrom_id', as: 'placeFrom' })
Place.hasMany(Movement, { foreignKey: 'placeFrom_id', as: 'movementsFrom' })

Movement.belongsTo(Place, { foreignKey: 'placeTo_id', as: 'placeTo' })
Place.hasMany(Movement, { foreignKey: 'placeTo_id', as: 'movementsTo' })

// EQUIPMENT
Equipment.belongsTo(EquipmentUnit, { foreignKey: 'Unitid', as: 'unit' })
EquipmentUnit.hasMany(Equipment, { foreignKey: 'Unitid', as: 'equipments' })

Equipment.belongsTo(EquipmentType, { foreignKey: 'Unitid', as: 'type' })
EquipmentType.hasMany(Equipment, { foreignKey: 'Unitid', as: 'equipments' })

Equipment.belongsTo(EquipmentBrand, { foreignKey: 'Unitid', as: 'brand' })
EquipmentBrand.hasMany(Equipment, { foreignKey: 'Unitid', as: 'equipments' })

// Subjects
Subject.belongsToMany(Career, { through: Subject_Career, foreignKey: 'Careerid', as: 'careers' })
Career.belongsToMany(Subject, { through: Subject_Career, foreignKey: 'Subjectid', as: 'subjects' })

Subject.belongsToMany(Subject, { through: Requirement, foreignKey: 'subjectReqId', as: 'reqs' })
Subject.belongsToMany(Subject, { through: Requirement, foreignKey: 'subjectPreqId', as: 'preqs' })

// Requirement
Requirement.belongsTo(Career, { foreignKey: 'Careerid', as: 'career' })
Career.hasMany(Requirement, { foreignKey: 'Careerid', as: 'careerSubjects' })

// JOBTITLES
JobTitle.hasMany(JobTitle, { foreignKey: 'supJobTitleId', as: 'subJobs'})
JobTitle.belongsTo(JobTitle, { foreignKey: 'supJobTitleId', as: 'supJob'})

export { 
	User,
	Task,
	Place,
	Career,
	Subject,
	Movement,
	JobTitle,
	User_Task,
	PlaceType,
	Equipment,
	User_Place,
	Place_Place,
	Requirement,
	EquipmentUnit,
	EquipmentType,
	MovementReason,
	EquipmentBrand,
	Subject_Career,
}