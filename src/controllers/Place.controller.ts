import { Response } from 'express'
import { Response as Res, Get, Post, Delete, Body, Params, Controller } from '@decorators/express'

import { Place, IPlace } from '../models/Place'

@Controller('/places')export class PlaceController {
	@Get('/')	async findAll(@Res() res: Response<Place[]>): Promise<Response<Place[]>> {		try {
			return res.status(200).json(await Place.findAll())
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send([])
	}

	@Get('/:id')	async findOne(@Params('id') id: number, @Res() res: Response<Place>): Promise<Response<Place>> {		try {
			return res.status(200).json(await Place.findOne({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Post('/')	async save(@Body() place: IPlace, @Res() res: Response<Place>): Promise<Response<Place>> {		try {
			return res.status(201).json((await Place.upsert(place))[0])
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Delete('/:id')	async destroy(@Params('id') id: number, @Res() res: Response): Promise<Response> {		try {
			return res.status(202).send(await Place.destroy({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}
}