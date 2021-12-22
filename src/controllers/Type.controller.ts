import { Response } from 'express'
import { Response as Res, Get, Post, Delete, Body, Params, Controller } from '@decorators/express'

import Type from '../models/Type'

@Controller('/types')export class TypeController {
	@Get('/')	async findAll(@Res() res: Response<Type[]>): Promise<Response<Type[]>> {		try {
			return res.status(200).json(await Type.findAll())
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send([])
	}

	@Get('/:id')	async findOne(@Params('id') id: number, @Res() res: Response<Type>): Promise<Response<Type>> {		try {
			return res.status(200).json(await Type.findOne({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Post('/')	async save(@Body() type: Type, @Res() res: Response<Type>): Promise<Response<Type>> {		try {
			return res.status(201).json((await Type.upsert(type.toJSON()))[0])
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Delete('/:id')	async destroy(@Params('id') id: number, @Res() res: Response): Promise<Response> {		try {
			return res.status(202).send(await Type.destroy({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}
}