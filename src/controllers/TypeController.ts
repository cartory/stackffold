import { Response } from 'express'
import { getRepository } from 'typeorm'
import {

import { Type, TypeEntity } from '../models/Type'

@Controller('/types')

	@Get('/')

	@Get('/:id')

	@Post('/')

	@Delete('/:id')
}