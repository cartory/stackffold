import { Response } from 'express'
import { Response as Res, Get, Post, Delete, Body, Params, Controller } from '@decorators/express'

import Task from '../models/Task'

@Controller('/tasks')export class TaskController {
	@Get('/')	async findAll(@Res() res: Response<Task[]>): Promise<Response<Task[]>> {		try {
			return res.status(200).json(await Task.findAll())
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send([])
	}

	@Get('/:id')	async findOne(@Params('id') id: number, @Res() res: Response<Task>): Promise<Response<Task>> {		try {
			return res.status(200).json(await Task.findOne({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Post('/')	async save(@Body() task: Task, @Res() res: Response<Task>): Promise<Response<Task>> {		try {
			return res.status(201).json((await Task.upsert(task.toJSON()))[0])
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Delete('/:id')	async destroy(@Params('id') id: number, @Res() res: Response): Promise<Response> {		try {
			return res.status(202).send(await Task.destroy({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}
}