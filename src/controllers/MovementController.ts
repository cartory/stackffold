import { Response } from 'express'
import { getRepository } from 'typeorm'
import {	Response as Res,	Get, Post, Delete,	Body, Params, Controller,} from '@decorators/express'

import { Movement, MovementEntity } from '../models/Movement'

@Controller('/movements')export class MovementController {	protected repository = getRepository(MovementEntity)

	@Get('/')	findAll(@Res() res: Response<Movement[]>): Promise<Response<Movement[]>> {		return this.repository			.find()			.then(movements => res.json(movements))			.catch(err => res.set('err', err).json([]))	}

	@Get('/:id')	findOne(@Params('id') id: number, @Res() res: Response<Movement>): Promise<Response<Movement>> {		return this.repository			.findOne(id)			.then(movement => res.json(movement))			.catch(err => res.set('err', err).json(null))	}

	@Post('/')	save(@Body() movement: Movement, @Res() res: Response<Movement>): Promise<Response<Movement>> {		return this.repository			.save(movement)			.then(movement => res.json(movement))			.catch(err => res.set('err', err).json(null))	}

	@Delete('/:id')	destroy(@Params('id') id: number, @Res() res: Response): Promise<Response> {		return this.repository			.delete(id)			.then(result => res.json(result))			.catch(err => res.set('err', err).json(null))	}
}