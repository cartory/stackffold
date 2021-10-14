import { Response } from 'express'
import { getRepository } from 'typeorm'
import {	Response as Res,	Get, Post, Delete,	Body, Params, Controller,} from '@decorators/express'

import { Equipment, EquipmentEntity } from '../models/Equipment'

@Controller('/equipments')export class EquipmentController {	protected repository = getRepository(EquipmentEntity)

	@Get('/')	findAll(@Res() res: Response<Equipment[]>): Promise<Response<Equipment[]>> {		return this.repository			.find()			.then(equipments => res.json(equipments))			.catch(err => res.set('err', err).json([]))	}

	@Get('/:id')	findOne(@Params('id') id: number, @Res() res: Response<Equipment>): Promise<Response<Equipment>> {		return this.repository			.findOne(id)			.then(equipment => res.json(equipment))			.catch(err => res.set('err', err).json(null))	}

	@Post('/')	save(@Body() equipment: Equipment, @Res() res: Response<Equipment>): Promise<Response<Equipment>> {		return this.repository			.save(equipment)			.then(equipment => res.json(equipment))			.catch(err => res.set('err', err).json(null))	}

	@Delete('/:id')	destroy(@Params('id') id: number, @Res() res: Response): Promise<Response> {		return this.repository			.delete(id)			.then(result => res.json(result))			.catch(err => res.set('err', err).json(null))	}
}