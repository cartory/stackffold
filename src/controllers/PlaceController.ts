import { Response } from 'express'
import { getRepository } from 'typeorm'
import {	Response as Res,	Get, Post, Delete,	Body, Params, Controller,} from '@decorators/express'

import { Place, PlaceEntity } from '../models/Place'

@Controller('/places')export class PlaceController {	protected repository = getRepository(PlaceEntity)

	@Get('/')	findAll(@Res() res: Response<Place[]>): Promise<Response<Place[]>> {		return this.repository			.find()			.then(places => res.json(places))			.catch(err => res.set('err', err).json([]))	}

	@Get('/:id')	findOne(@Params('id') id: number, @Res() res: Response<Place>): Promise<Response<Place>> {		return this.repository			.findOne(id)			.then(place => res.json(place))			.catch(err => res.set('err', err).json(null))	}

	@Post('/')	save(@Body() place: Place, @Res() res: Response<Place>): Promise<Response<Place>> {		return this.repository			.save(place)			.then(place => res.json(place))			.catch(err => res.set('err', err).json(null))	}

	@Delete('/:id')	destroy(@Params('id') id: number, @Res() res: Response): Promise<Response> {		return this.repository			.delete(id)			.then(result => res.json(result))			.catch(err => res.set('err', err).json(null))	}
}