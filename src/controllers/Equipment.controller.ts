import { Response } from "express"
import { Response as Res, Get, Post, Delete, Body, Params, Controller, Query } from "@decorators/express"

import { IMovement } from "src/models/Movement"
import { IEquipment } from "../models/Equipment"

import { Equipment, Movement, Place } from "../utils/models"
import movementService from "../services/movement.service"
@Controller("/equipments")
export class EquipmentController {
	@Get("/")
	async findAll(@Query() query, @Res() res: Response<Equipment[]>): Promise<Response<Equipment[]>> {
		const { page = 0, limit = 10, placeId } = query
		try {
			const equipments = await Equipment.findAll({
				offset: page * limit,
				limit: Number.parseInt(limit),
				include: [
					"unit",
					{
						model: Place,
						as: "places",
						include: ["type"],
						where: placeId && { id: placeId },
						through: { attributes: [] },
					},
					{
						model: Movement,
						as: "movements",
						include: [
							"reason",
							{
								model: Place,
								as: "placeTo",
								include: ["type"],
							},
							{
								model: Place,
								as: "placeFrom",
								include: ["type"],
							},
						],
					},
				],
			})

			return res.status(200).json(equipments)
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send([])
	}

	@Get("/:id")
	async findOne(@Params("id") id: number, @Res() res: Response<Equipment>): Promise<Response<Equipment>> {
		try {
			const equipment = await Equipment.findOne({
				where: { id },
				include: [
					"unit",
					{
						model: Place,
						as: "places",
						include: ["type"],
						through: { attributes: [] },
					},
					{
						model: Movement,
						as: "movements",
						include: [
							"reason",
							{
								model: Place,
								as: "placeTo",
								include: ["type"],
							},
							{
								model: Place,
								as: "placeFrom",
								include: ["type"],
							},
						],
					},
				],
			})

			return res.status(200).json(equipment)
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Post("/movement")
	async makeMovement(@Body() body, @Res() res: Response<boolean>): Promise<Response<boolean>> {
		const { movement, equipmentIDs = [] } = body
		try {
			const result = await movementService.makeTransaction(movement as IMovement, equipmentIDs as number[])
			return res.status(201).send(result)
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(false)
	}

	@Post("/")
	async save(@Body() equipment: IEquipment, @Res() res: Response<Equipment>): Promise<Response<Equipment>> {
		try {
			return res.status(201).json((await Equipment.upsert(equipment))[0])
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Delete("/:id")
	async destroy(@Params("id") id: number, @Res() res: Response): Promise<Response> {
		try {
			return res.status(202).send(await Equipment.destroy({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}
}
