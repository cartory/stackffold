import { Response } from 'express'
import { Response as Res, Get, Post, Delete, Body, Params, Controller } from '@decorators/express'

import { IEquipmentUnit } from '../models/EquipmentUnit'
import { EquipmentUnit } from '../utils/models'

@Controller('/equipmentunits')export class EquipmentUnitController {
	@Get('/')	async findAll(@Res() res: Response<EquipmentUnit[]>): Promise<Response<EquipmentUnit[]>> {		try {
			return res.status(200).json(await EquipmentUnit.findAll())
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send([])
	}

	@Get('/:id')	async findOne(@Params('id') id: number, @Res() res: Response<EquipmentUnit>): Promise<Response<EquipmentUnit>> {		try {
			return res.status(200).json(await EquipmentUnit.findOne({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Post('/')	async save(@Body() equipmentunit: IEquipmentUnit, @Res() res: Response<EquipmentUnit>): Promise<Response<EquipmentUnit>> {		try {
			return res.status(201).json((await EquipmentUnit.upsert(equipmentunit))[0])
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Delete('/:id')	async destroy(@Params('id') id: number, @Res() res: Response): Promise<Response> {		try {
			return res.status(202).send(await EquipmentUnit.destroy({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}
}