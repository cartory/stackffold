import { Response } from 'express'
import { getRepository } from 'typeorm'
import {	Response as Res,	Get, Post, Delete,	Body, Params, Controller,} from '@decorators/express'

import { Task, TaskEntity } from '../models/Task'

@Controller('/tasks')export class TaskController {	protected repository = getRepository(TaskEntity)

	@Get('/')	findAll(@Res() res: Response<Task[]>): Promise<Response<Task[]>> {		return this.repository			.find()			.then(tasks => res.json(tasks))			.catch(err => res.set('err', err).json([]))	}

	@Get('/:id')	findOne(@Params('id') id: number, @Res() res: Response<Task>): Promise<Response<Task>> {		return this.repository			.findOne(id)			.then(task => res.json(task))			.catch(err => res.set('err', err).json(null))	}

	@Post('/')	save(@Body() task: Task, @Res() res: Response<Task>): Promise<Response<Task>> {		return this.repository			.save(task)			.then(task => res.json(task))			.catch(err => res.set('err', err).json(null))	}

	@Delete('/:id')	destroy(@Params('id') id: number, @Res() res: Response): Promise<Response> {		return this.repository			.delete(id)			.then(result => res.json(result))			.catch(err => res.set('err', err).json(null))	}
}