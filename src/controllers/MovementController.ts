import { Response } from 'express'
import { getRepository } from 'typeorm'
import {

import { Movement, MovementEntity } from '../models/Movement'

@Controller('/movements')

	@Get('/')

	@Get('/:id')

	@Post('/')

	@Delete('/:id')
}