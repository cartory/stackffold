import { Response } from "express"
import { Response as Res, Get, Post, Delete, Body, Params, Controller, Query } from "@decorators/express"

import { User, IUser } from "../models/User"
import auth from "../services/auth.service"

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
	async findOne(@Params("id") id: number, @Query() query, @Res() res: Response<User | boolean | string>): Promise<Response<User | boolean | string>> {
		const { verifiedCode, sendMail = false } = query
		try {
			const user = await User.findOne({ where: { id } })

			if (verifiedCode) {
				return res.status(202).send(await auth.checkVerificationCode(user, verifiedCode))
			}

			if (sendMail) {
				return res.status(202).send(await auth.sendVerificationMail(user))
			}

			return res.status(200).json(user)
		} catch (err) {
			console.error(err)
		}
		return res.status(500).send(null)
	}

	@Post("/")
	async save(@Body() user: IUser, @Res() res: Response<User>): Promise<Response<User>> {
		try {
			return res.status(201).json((await User.upsert(user))[0])
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
