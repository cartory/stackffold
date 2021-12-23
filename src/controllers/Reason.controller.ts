import { Response } from 'express'
import { Response as Res, Get, Post, Delete, Body, Params, Controller } from '@decorators/express'

import { IReason } from '../models/Reason'
import { Reason } from '../utils/models'

@Controller('/reasons')export class ReasonController {
	@Get('/')	async findAll(@Res() res: Response<Reason[]>): Promise<Response<Reason[]>> {		try {
			return res.status(200).json(await Reason.findAll())
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send([])
	}

	@Get('/:id')	async findOne(@Params('id') id: number, @Res() res: Response<Reason>): Promise<Response<Reason>> {		try {
			return res.status(200).json(await Reason.findOne({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Post('/')	async save(@Body() reason: IReason, @Res() res: Response<Reason>): Promise<Response<Reason>> {		try {
			return res.status(201).json((await Reason.upsert(reason))[0])
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Delete('/:id')	async destroy(@Params('id') id: number, @Res() res: Response): Promise<Response> {		try {
			return res.status(202).send(await Reason.destroy({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}
}