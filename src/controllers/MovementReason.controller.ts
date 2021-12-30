import { Response } from 'express'
import { Response as Res, Get, Post, Delete, Body, Params, Controller } from '@decorators/express'

import { IMovementReason } from '../models/MovementReason'
import { MovementReason } from '../utils/models'

@Controller('/movementreasons')export class MovementReasonController {
	@Get('/')	async findAll(@Res() res: Response<MovementReason[]>): Promise<Response<MovementReason[]>> {		try {
			return res.status(200).json(await MovementReason.findAll())
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send([])
	}

	@Get('/:id')	async findOne(@Params('id') id: number, @Res() res: Response<MovementReason>): Promise<Response<MovementReason>> {		try {
			return res.status(200).json(await MovementReason.findOne({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Post('/')	async save(@Body() movementreason: IMovementReason, @Res() res: Response<MovementReason>): Promise<Response<MovementReason>> {		try {
			return res.status(201).json((await MovementReason.upsert(movementreason))[0])
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Delete('/:id')	async destroy(@Params('id') id: number, @Res() res: Response): Promise<Response> {		try {
			return res.status(202).send(await MovementReason.destroy({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}
}