import { Response } from 'express'
import { getRepository } from 'typeorm'
import {

import { Task, TaskEntity } from '../models/Task'

@Controller('/tasks')

	@Get('/')

	@Get('/:id')

	@Post('/')

	@Delete('/:id')
}