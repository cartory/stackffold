import { Response } from "express"
import { Response as Res, Get, Post, Delete, Body, Params, Controller, Query } from "@decorators/express"

import { Subject } from "../utils/models"
import { ISubject } from "../models/Subject"
import { querySubjects } from "../services/subject.service"

@Controller("/subjects")
export class SubjectController {
	@Get("/")
	async findAll(@Query() query, @Res() res: Response<Subject[]>): Promise<Response<Subject[]>> {
		let { page = 0, limit = 10, careerId, semester } = query
		page = Number.parseInt(page)
		limit = Number.parseInt(limit)

		try {
			if (!careerId && !semester) {
				return res.status(200).json(await Subject.findAll({
					limit: limit,
					offset: limit * page,
				}))
			}
			const subjects = await querySubjects({
				semester: semester,
				careerId: careerId,
				limit: limit,
				offset: page * limit,
			})

			return res.status(200).json(subjects as Subject[])
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send([])
	}

	@Get("/:id")
	async findOne(@Query("careerId") careerId: number, @Params("id") id: number, @Res() res: Response<Subject>): Promise<Response<Subject>> {
		try {
			return res.status(200).json(
				await Subject.findOne({
					where: { id },
					include: [
						{
							association: "reqs",
							through: {
								attributes: [],
								where: careerId && { Careerid: 1 },
							},
						},
						{
							association: "preqs",
							through: {
								attributes: [],
								where: careerId && { Careerid: 1 },
							},
						},
					],
				})
			)
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Post("/")
	async save(@Body() subject: ISubject, @Res() res: Response<Subject>): Promise<Response<Subject>> {
		try {
			return res.status(201).json((await Subject.upsert(subject))[0])
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Delete("/:id")
	async destroy(@Params("id") id: number, @Res() res: Response): Promise<Response> {
		try {
			return res.status(202).send(await Subject.destroy({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}
}
