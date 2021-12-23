import { Response } from 'express'
import { Response as Res, Get, Post, Delete, Body, Params, Controller } from '@decorators/express'

import { IUnit } from '../models/Unit'
import { Unit } from '../utils/models'

@Controller('/units')export class UnitController {
	@Get('/')	async findAll(@Res() res: Response<Unit[]>): Promise<Response<Unit[]>> {		try {
			return res.status(200).json(await Unit.findAll())
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send([])
	}

	@Get('/:id')	async findOne(@Params('id') id: number, @Res() res: Response<Unit>): Promise<Response<Unit>> {		try {
			return res.status(200).json(await Unit.findOne({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Post('/')	async save(@Body() unit: IUnit, @Res() res: Response<Unit>): Promise<Response<Unit>> {		try {
			return res.status(201).json((await Unit.upsert(unit))[0])
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Delete('/:id')	async destroy(@Params('id') id: number, @Res() res: Response): Promise<Response> {		try {
			return res.status(202).send(await Unit.destroy({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}
}