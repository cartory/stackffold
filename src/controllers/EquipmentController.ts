import { Response } from 'express'
import { Response as Res, Get, Post, Delete, Body, Params, Controller } from '@decorators/express'

import Equipment from '../models/Equipment'

@Controller('/equipments')export class EquipmentController {
	@Get('/')	async findAll(@Res() res: Response<Equipment[]>): Promise<Response<Equipment[]>> {		try {
			return res.status(200).json(await Equipment.findAll())
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send([])
	}

	@Get('/:id')	async findOne(@Params('id') id: number, @Res() res: Response<Equipment>): Promise<Response<Equipment>> {		try {
			return res.status(200).json(await Equipment.findOne({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Post('/')	async save(@Body() equipment: Equipment, @Res() res: Response<Equipment>): Promise<Response<Equipment>> {		try {
			return res.status(201).json((await Equipment.upsert(equipment.toJSON()))[0])
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Delete('/:id')	async destroy(@Params('id') id: number, @Res() res: Response): Promise<Response> {		try {
			return res.status(202).send(await Equipment.destroy({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}
}