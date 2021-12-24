import { Response } from 'express'
import { Response as Res, Get, Post, Delete, Body, Params, Controller } from '@decorators/express'

import { ICareer } from '../models/Career'
import { Career } from '../utils/models'

@Controller('/careers')export class CareerController {
	@Get('/')	async findAll(@Res() res: Response<Career[]>): Promise<Response<Career[]>> {		try {
			return res.status(200).json(await Career.findAll())
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send([])
	}

	@Get('/:id')	async findOne(@Params('id') id: number, @Res() res: Response<Career>): Promise<Response<Career>> {		try {
			return res.status(200).json(await Career.findOne({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Post('/')	async save(@Body() career: ICareer, @Res() res: Response<Career>): Promise<Response<Career>> {		try {
			return res.status(201).json((await Career.upsert(career))[0])
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Delete('/:id')	async destroy(@Params('id') id: number, @Res() res: Response): Promise<Response> {		try {
			return res.status(202).send(await Career.destroy({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}
}