import { Response } from 'express'
import { getRepository } from 'typeorm'
import {

import { Equipment, EquipmentEntity } from '../models/Equipment'

@Controller('/equipments')

	@Get('/')

	@Get('/:id')

	@Post('/')

	@Delete('/:id')
}