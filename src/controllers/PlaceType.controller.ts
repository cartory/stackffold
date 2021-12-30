import { Response } from 'express'
import { Response as Res, Get, Post, Delete, Body, Params, Controller } from '@decorators/express'

import { IPlaceType } from '../models/PlaceType'
import { PlaceType } from '../utils/models'

@Controller('/placetypes')export class PlaceTypeController {
	@Get('/')	async findAll(@Res() res: Response<PlaceType[]>): Promise<Response<PlaceType[]>> {		try {
			return res.status(200).json(await PlaceType.findAll())
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send([])
	}

	@Get('/:id')	async findOne(@Params('id') id: number, @Res() res: Response<PlaceType>): Promise<Response<PlaceType>> {		try {
			return res.status(200).json(await PlaceType.findOne({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Post('/')	async save(@Body() placetype: IPlaceType, @Res() res: Response<PlaceType>): Promise<Response<PlaceType>> {		try {
			return res.status(201).json((await PlaceType.upsert(placetype))[0])
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Delete('/:id')	async destroy(@Params('id') id: number, @Res() res: Response): Promise<Response> {		try {
			return res.status(202).send(await PlaceType.destroy({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}
}