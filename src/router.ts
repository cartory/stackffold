import { Router } from 'express'
import { attachControllers } from '@decorators/express'

import { TypeController } from './controllers/TypeController'
import { UserController } from './controllers/UserController'
import { TaskController } from './controllers/TaskController'
import { UnitController } from './controllers/UnitController'
import { PlaceController } from './controllers/PlaceController'
import { ReasonController } from './controllers/ReasonController'
import { EquipmentController } from './controllers/EquipmentController'

const router = Router()

attachControllers(router, [
	TypeController,
	UserController,
	TaskController,
	UnitController,
	PlaceController,
	ReasonController,
	EquipmentController,
])

export default router