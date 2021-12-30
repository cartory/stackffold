import { Response } from 'express'
import { Response as Res, Get, Post, Delete, Body, Params, Controller } from '@decorators/express'

import { IEquipmentType } from '../models/EquipmentType'
import { EquipmentType } from '../utils/models'

@Controller('/equipmenttypes')export class EquipmentTypeController {
	@Get('/')	async findAll(@Res() res: Response<EquipmentType[]>): Promise<Response<EquipmentType[]>> {		try {
			return res.status(200).json(await EquipmentType.findAll())
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send([])
	}

	@Get('/:id')	async findOne(@Params('id') id: number, @Res() res: Response<EquipmentType>): Promise<Response<EquipmentType>> {		try {
			return res.status(200).json(await EquipmentType.findOne({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Post('/')	async save(@Body() equipmenttype: IEquipmentType, @Res() res: Response<EquipmentType>): Promise<Response<EquipmentType>> {		try {
			return res.status(201).json((await EquipmentType.upsert(equipmenttype))[0])
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Delete('/:id')	async destroy(@Params('id') id: number, @Res() res: Response): Promise<Response> {		try {
			return res.status(202).send(await EquipmentType.destroy({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}
}