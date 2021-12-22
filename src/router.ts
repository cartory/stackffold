import { Router } from 'express'
import { attachControllers } from '@decorators/express'

import { TypeController } from './controllers/Type.controller'
import { UserController } from './controllers/User.controller'
import { TaskController } from './controllers/Task.controller'
import { UnitController } from './controllers/Unit.controller'
import { PlaceController } from './controllers/Place.controller'
import { ReasonController } from './controllers/Reason.controller'
import { EquipmentController } from './controllers/Equipment.controller'

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