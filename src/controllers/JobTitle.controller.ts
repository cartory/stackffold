import { Response } from 'express'
import { Response as Res, Get, Post, Delete, Body, Params, Controller } from '@decorators/express'

import { IJobTitle } from '../models/JobTitle'
import { JobTitle } from '../utils/models'

@Controller('/jobtitles')export class JobTitleController {
	@Get('/')	async findAll(@Res() res: Response<JobTitle[]>): Promise<Response<JobTitle[]>> {		try {
			return res.status(200).json(await JobTitle.findAll())
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send([])
	}

	@Get('/:id')	async findOne(@Params('id') id: number, @Res() res: Response<JobTitle>): Promise<Response<JobTitle>> {		try {
			return res.status(200).json(await JobTitle.findOne({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Post('/')	async save(@Body() jobtitle: IJobTitle, @Res() res: Response<JobTitle>): Promise<Response<JobTitle>> {		try {
			return res.status(201).json((await JobTitle.upsert(jobtitle))[0])
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Delete('/:id')	async destroy(@Params('id') id: number, @Res() res: Response): Promise<Response> {		try {
			return res.status(202).send(await JobTitle.destroy({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}
}