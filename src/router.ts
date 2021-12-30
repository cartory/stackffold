import { Router } from 'express'
import { attachControllers } from '@decorators/express'

import { UserController } from './controllers/User.controller'
import { TaskController } from './controllers/Task.controller'
import { PlaceController } from './controllers/Place.controller'
import { CareerController } from './controllers/Career.controller'
import { SubjectController } from './controllers/Subject.controller'
import { JobTitleController } from './controllers/JobTitle.controller'
import { PlaceTypeController } from './controllers/PlaceType.controller'
import { EquipmentController } from './controllers/Equipment.controller'
import { EquipmentUnitController } from './controllers/EquipmentUnit.controller'
import { EquipmentTypeController } from './controllers/EquipmentType.controller'
import { EquipmentBrandController } from './controllers/EquipmentBrand.controller'
import { MovementReasonController } from './controllers/MovementReason.controller'

const router = Router()

attachControllers(router, [
	UserController,
	TaskController,
	PlaceController,
	CareerController,
	SubjectController,
	JobTitleController,
	PlaceTypeController,
	EquipmentController,
	EquipmentUnitController,
	EquipmentTypeController,
	EquipmentBrandController,
	MovementReasonController,
])

export default router