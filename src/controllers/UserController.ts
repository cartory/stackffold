import { Response } from 'express'
import { getRepository } from 'typeorm'
import {	Response as Res,	Get, Post, Delete,	Body, Params, Controller,} from '@decorators/express'

import { User, UserEntity } from '../models/User'

@Controller('/users')export class UserController {	protected repository = getRepository(UserEntity)

	@Get('/')	findAll(@Res() res: Response<User[]>): Promise<Response<User[]>> {		return this.repository			.find()			.then(users => res.json(users))			.catch(err => res.set('err', err).json([]))	}

	@Get('/:id')	findOne(@Params('id') id: number, @Res() res: Response<User>): Promise<Response<User>> {		return this.repository			.findOne(id)			.then(user => res.json(user))			.catch(err => res.set('err', err).json(null))	}

	@Post('/')	save(@Body() user: User, @Res() res: Response<User>): Promise<Response<User>> {		return this.repository			.save(user)			.then(user => res.json(user))			.catch(err => res.set('err', err).json(null))	}

	@Delete('/:id')	destroy(@Params('id') id: number, @Res() res: Response): Promise<Response> {		return this.repository			.delete(id)			.then(result => res.json(result))			.catch(err => res.set('err', err).json(null))	}
}