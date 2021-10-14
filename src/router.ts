import { Router } from 'express'
import { attachControllers } from '@decorators/express'

import { TypeController } from './controllers/TypeController'
import { UserController } from './controllers/UserController'
import { TaskController } from './controllers/TaskController'
import { PlaceController } from './controllers/PlaceController'
import { MovementController } from './controllers/MovementController'
import { EquipmentController } from './controllers/EquipmentController'

const router = Router()

attachControllers(router, [
	TypeController,
	UserController,
	TaskController,
	PlaceController,
	MovementController,
	EquipmentController,
])

export default router