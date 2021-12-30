import { Response } from 'express'
import { Response as Res, Get, Post, Delete, Body, Params, Controller } from '@decorators/express'

import { IEquipmentBrand } from '../models/EquipmentBrand'
import { EquipmentBrand } from '../utils/models'

@Controller('/equipmentbrands')export class EquipmentBrandController {
	@Get('/')	async findAll(@Res() res: Response<EquipmentBrand[]>): Promise<Response<EquipmentBrand[]>> {		try {
			return res.status(200).json(await EquipmentBrand.findAll())
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send([])
	}

	@Get('/:id')	async findOne(@Params('id') id: number, @Res() res: Response<EquipmentBrand>): Promise<Response<EquipmentBrand>> {		try {
			return res.status(200).json(await EquipmentBrand.findOne({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Post('/')	async save(@Body() equipmentbrand: IEquipmentBrand, @Res() res: Response<EquipmentBrand>): Promise<Response<EquipmentBrand>> {		try {
			return res.status(201).json((await EquipmentBrand.upsert(equipmentbrand))[0])
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Delete('/:id')	async destroy(@Params('id') id: number, @Res() res: Response): Promise<Response> {		try {
			return res.status(202).send(await EquipmentBrand.destroy({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}
}