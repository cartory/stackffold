import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import { createConnection } from 'typeorm'

dotenv.config()
const app = express()

const main = async (server: express.Express): Promise<void> => {
	process.env.NODE_ENV == 'development' && server.use(require('morgan')('dev'))

	await createConnection({
		type: 'mysql',
		url: process.env.DATABASE_URL,
		entities: [ 'src/models/*.ts' ],
	})

	server.use('/api', (await import('./router')).default)
	server.listen(process.env.PORT || 3000, () => {
		console.log('[32mDB Connected Sucessfully![0m')
		console.log(`Server running on [33mhttp://${process.env.HOST}:${process.env.PORT}[0m`)
	})
}

app
	.use(cors())
	.use(express.urlencoded({ extended: true }))
	.use(express.json({ limit: process.env.BODY_SIZE }))
	// ROUTES
	.get('/', (_, res) => res.send('<h1>Welcome to Generated API 👋 </h1>'))

main(app)
	.then(() => console.log(new Date()))
	.catch(err => console.error(err))