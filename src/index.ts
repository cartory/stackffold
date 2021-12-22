import cors from "cors"
import express from "express"

import apiRouter from "./router"
import sequelize from "./sequelize"

const app = express()

// DB CONNECTION
sequelize
	.authenticate()
	.then(async () => {
		// await sequelize.sync({ logging: false, alter: true })
		console.log(`\x1b[32mDB Connected Sucessfully!\x1b[0m`)
	})
	.catch((err) => {
		console.error(err)
		process.exit(0)
	})

app
	// SETUP
	.use(cors())
	.use(express.urlencoded({ extended: true }))
	.use(express.json({ limit: process.env.BODY_SIZE }))
	// ROUTES
	.use("/api", apiRouter)
	.get("/", (_, res) => res.send("<h1>Welcome to Generated API 👋 </h1>"))

app.listen(process.env.PORT || 3000, () => {
	process.env.NODE_ENV === "development" && app.use(require('morgan')('dev'))
	console.log(`Server running on \x1b[33mhttp://${process.env.HOST}:${process.env.PORT}\x1b[0m`)
	console.log(new Date())
})
