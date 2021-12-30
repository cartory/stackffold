import { Response } from "express"
import { Response as Res, Get, Post, Delete, Body, Params, Controller, Query } from "@decorators/express"

import { IPlace } from "../models/Place"
import { Place, Task, PlaceType } from "../utils/models"

@Controller("/places")
export class PlaceController {
	@Get("/")
	async findAll(@Query() query, @Res() res: Response<Place[]>): Promise<Response<Place[]>> {
		const { page = 0, limit = 10 } = query
		try {
			const type = await PlaceType.findOne()
			
			const places = await Place.findAll({
				offset: page * limit,
				limit: Number.parseInt(limit),
				where: {
					Typeid: type && type.getDataValue('id')
				},
				include: [
					{ model: PlaceType, as: "type" },
					{ model: Task, as: "tasks" },
					{
						model: Place,
						association: "places",
						through: { attributes: [] },
						include: [
							{ model: PlaceType, as: "type" },
							{ model: Task, as: "tasks" },
						],
					},
				],
			})

			return res.status(200).json(places)
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send([])
	}

	@Get("/:id")
	async findOne(@Params("id") id: number, @Res() res: Response<Place>): Promise<Response<Place>> {
		try {
			const place = await Place.findOne({
				where: { id },
				include: [
					{ model: PlaceType, as: "type" },
					{ model: Task, as: "tasks" },
					{
						model: Place,
						association: "places",
						through: { attributes: [] },
						include: [
							{ model: PlaceType, as: "type" },
							{ model: Task, as: "tasks" },
						],
					},
				],
			})
			return res.status(200).json(place)
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Post("/")
	async save(@Body() place: IPlace, @Res() res: Response<Place>): Promise<Response<Place>> {
		try {
			return res.status(201).json((await Place.upsert(place))[0])
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Delete("/:id")
	async destroy(@Params("id") id: number, @Res() res: Response): Promise<Response> {
		try {
			return res.status(202).send(await Place.destroy({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}
}
