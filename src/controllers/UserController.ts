import { Response } from 'express'
import { getRepository } from 'typeorm'
import {

import { User, UserEntity } from '../models/User'

@Controller('/users')

	@Get('/')

	@Get('/:id')

	@Post('/')

	@Delete('/:id')
}