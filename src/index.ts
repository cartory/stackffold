import cors from "cors"
import express from "express"

import apiRouter from "./router"
import sequelize from "./utils/sequelize"

import adminjs from "adminjs"
import adminExpress from "@adminjs/express"
import sequelizeAdapter from "@adminjs/sequelize"

const app = express()

// ADMINJS
adminjs.registerAdapter(sequelizeAdapter)
const admin = new adminjs({
	rootPath: "/admin",
	databases: [sequelize],
	resources: sequelize.modelManager.all,
})

const adminRouter = adminExpress.buildRouter(admin)

// DB CONNECTION
sequelize
	.authenticate()
	.then(async () => {
		// await sequelize.sync({ logging: true })
		console.log(`\x1b[32mDB Connected Sucessfully!\x1b[0m`)
		process.env.NODE_ENV === "development" && (await admin.watch())
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
	.use(admin.options.rootPath, adminRouter)
	.get("/", (_, res) => res.send("<h1>Welcome to Generated API 👋 </h1>"))

app.listen(process.env.PORT || 3000, () => {
	process.env.NODE_ENV === "development" && app.use(require("morgan")("dev"))
	console.log(`Server running on \x1b[33mhttp://${process.env.HOST}:${process.env.PORT}\x1b[0m`)
	console.log(new Date())
})
