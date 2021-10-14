import { Response } from 'express'
import { getRepository } from 'typeorm'
import {	Response as Res,	Get, Post, Delete,	Body, Params, Controller,} from '@decorators/express'

import { Type, TypeEntity } from '../models/Type'

@Controller('/types')export class TypeController {	protected repository = getRepository(TypeEntity)

	@Get('/')	findAll(@Res() res: Response<Type[]>): Promise<Response<Type[]>> {		return this.repository			.find()			.then(types => res.json(types))			.catch(err => res.set('err', err).json([]))	}

	@Get('/:id')	findOne(@Params('id') id: number, @Res() res: Response<Type>): Promise<Response<Type>> {		return this.repository			.findOne(id)			.then(type => res.json(type))			.catch(err => res.set('err', err).json(null))	}

	@Post('/')	save(@Body() type: Type, @Res() res: Response<Type>): Promise<Response<Type>> {		return this.repository			.save(type)			.then(type => res.json(type))			.catch(err => res.set('err', err).json(null))	}

	@Delete('/:id')	destroy(@Params('id') id: number, @Res() res: Response): Promise<Response> {		return this.repository			.delete(id)			.then(result => res.json(result))			.catch(err => res.set('err', err).json(null))	}
}