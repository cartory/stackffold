import { Response } from 'express'
import { getRepository } from 'typeorm'
import {

import { Place, PlaceEntity } from '../models/Place'

@Controller('/places')

	@Get('/')

	@Get('/:id')

	@Post('/')

	@Delete('/:id')
}