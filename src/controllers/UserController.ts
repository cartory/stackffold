import { Response } from "express"
import { Response as Res, Get, Post, Delete, Body, Params, Controller } from "@decorators/express"

import User from "../models/User"

@Controller("/users")
export class UserController {
	@Get("/")
	async findAll(@Res() res: Response<User[]>): Promise<Response<User[]>> {
		try {
			return res.status(200).json(await User.findAll())
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send([])
	}

	@Get("/:id")
	async findOne(@Params("id") id: number, @Res() res: Response<User>): Promise<Response<User>> {
		try {
			return res.status(200).json(await User.findOne({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Post("/")
	async save(@Body() user: User, @Res() res: Response<User>): Promise<Response<User>> {
		try {
			return res.status(201).json((await User.upsert(user.toJSON()))[0])
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Delete("/:id")
	async destroy(@Params("id") id: number, @Res() res: Response): Promise<Response> {
		try {
			return res.status(202).send(await User.destroy({ where: { id } }))
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}
}
