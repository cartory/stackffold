import { getDataType, getDataSequelizetype } from "../utils/constants"
import { Column, Table, TableBuilder } from "./table"

const getSequelizeColumn = (column: Column) => {
	const { references } = column
	return {
		key: column.name,
		type: getDataSequelizetype[column.type](column.length),
		unique: column.unique,
		allowNull: column.nullable,
		primaryKey: column.primary,
		autoIncrement: column.generated === "increment",
		autoIncrementIdentity: column.generated === "increment",
		references: references != null && `{ key: '${references.columnName}', model: '${references.tableName}' }`,
	}
}

const buildMethod = (tryResponse: string, catchResponse: string = "res.status(500).send(null)") => {
	return `\t\ttry {\n\t\t\treturn ${tryResponse}\n\t\t} catch (err) {\n\t\t\tconsole.error(err)\n\t\t}\n\t\treturn ${catchResponse}`
}

export class SequelizeBuilder extends TableBuilder {
	protected buildIndex(): void {
		const data =
			"" +
			"import cors from 'cors'\nimport dotenv from 'dotenv'\nimport express from 'express'\n\n" +
			// import sequelize
			"import { createConnection } from 'typeorm'\n\n" +
			"dotenv.config()\nconst app = express()\n\n" +
			"const main = async (server: express.Express): Promise<void> => {\n" +
			"\tprocess.env.NODE_ENV == 'development' && server.use(require('morgan')('dev'))\n\n" +
			// typeOrmConnection
			"\tawait createConnection({\n\t\ttype: 'mysql',\n\t\turl: process.env.DATABASE_URL,\n\t\tentities: [ 'src/models/*.ts' ],\n\t})\n\n" +
			"\tserver.use('/api', (await import('./router')).default)\n" +
			"\tserver.listen(process.env.PORT || 3000, () => {\n\t\tconsole.log('\x1b[32mDB Connected Sucessfully!\x1b[0m')\n" +
			"\t\tconsole.log(`Server running on [33mhttp://${process.env.HOST}:${process.env.PORT}[0m`)\n\t})\n}\n\n" +
			"app\n\t.use(cors())\n\t.use(express.urlencoded({ extended: true }))\n\t.use(express.json({ limit: process.env.BODY_SIZE }))\n" +
			"\t// ROUTES\n\t.get('/', (_, res) => res.send('<h1>Welcome to Generated API 👋 </h1>'))\n\n" +
			"main(app)\n\t.then(() => console.log(new Date()))\n\t.catch(err => console.error(err))"

		// this.path = "src/index.ts";
		this.writeFile("src/index.ts", data)
	}

	protected buildModel({ name, columns, dataModel }: Table): void {
		const data =
			"" +
			"import sequelize from '../utils/sequelize'\r\n" +
			"import { Model, DataTypes } from 'sequelize'\r\n\n" +
			`export interface I${name} {\r` +
			`${columns
				.map(({ name, type, nullable }) => {
					;(name === "id" || nullable) && (name = `${name}?`)
					return `\t${name}: ${getDataType(type)}`
				})
				.join("\r")}\r}\r\n\n` +
			`export class ${name} extends Model<I${name}> { }\r\n\n` +
			`${name}.init({\r` +
			`${columns
				.map((column) => {
					let rawColumnOptions = ""
					let jsonColumn = getSequelizeColumn(column)

					for (let key in jsonColumn) {
						let value = jsonColumn[key]
						if (!jsonColumn[key]) continue
						value = typeof jsonColumn[key] == "string" && key !== "type" && key !== "references" ? `'${value}'` : value
						rawColumnOptions += `\t\t${key}: ${value},\r`
					}

					return `\t${column.name}: {\r${rawColumnOptions}\t},`
				})
				.join("\r\n")}\n` +
			`}, {\r\tsequelize, \r\ttableName: '${name}', \r\t` +
			`deletedAt: ${dataModel === "Physical"},\r\t` +
			`timestamps: ${dataModel === "Physical"}, \r})\n\n`

		this.writeFile(`src/models/${name}.ts`, data)
	}

	protected buildController({ name }: Table): void {
		let lowerName: string = name.toLocaleLowerCase()

		const data =
			"" +
			"import { Response } from 'express'\n" +
			"import { Response as Res, Get, Post, Delete, Body, Params, Controller } from '@decorators/express'" +
			`\r\n\nimport { I${name} } from '../models/${name}'\r\n` +
			`import { ${name} } from '../utils/models'\r\n\n` +
			`@Controller('/${lowerName}s')\r` +
			`export class ${name}Controller {\n` +
			// findAll
			`\t@Get('/')\r\tasync findAll(@Res() res: Response<${name}[]>): Promise<Response<${name}[]>> {\r` +
			`${buildMethod(`res.status(200).json(await ${name}.findAll())`, "res.status(500).send([])")}\n\t}\r\n\n` +
			// findOne
			`\t@Get('/:id')\r\tasync findOne(@Params('id') id: number, @Res() res: Response<${name}>): Promise<Response<${name}>> {\r` +
			`${buildMethod(`res.status(200).json(await ${name}.findOne({ where: { id } }))`)}\n\t}\r\n\n` +
			// save
			`\t@Post('/')\r\tasync save(@Body() ${lowerName}: I${name}, @Res() res: Response<${name}>): Promise<Response<${name}>> {\r` +
			`${buildMethod(`res.status(201).json((await ${name}.upsert(${lowerName}))[0])`)}\n\t}\r\n\n` +
			// delete
			`\t@Delete('/:id')\r\tasync destroy(@Params('id') id: number, @Res() res: Response): Promise<Response> {\r` +
			`${buildMethod(`res.status(202).send(await ${name}.destroy({ where: { id } }))`)}\n\t}\r\n}`

		// this.path = `src/controllers/${name}Controller.ts`;
		this.writeFile(`src/controllers/${name}.controller.ts`, data)
	}

	buildConnection(): void {
		const data = `import { config } from "dotenv"\nimport { Sequelize } from "sequelize"\n\nconfig()\nexport default new Sequelize(process.env.DATABASE_URL, {\n\t// logging: false,\n\tdefine: {\n\t\tparanoid: true,\n\t\tdefaultScope: {\n\t\t\tattributes: {\n\t\t\t\texclude: ["createdAt", "updatedAt", "deletedAt"],\n\t\t\t},\n\t\t},\n\t},\n\tpool: {\n\t\tidle: 10000,\n\t\tacquire: 3600000,\n\t},\n})\n`
		this.writeFile("src/utils/sequelize.ts", data)
	}

	addModelRelationships(tables: Table[]): void {
		const models: string[] = tables.map(({ name }) => name).sort((a, b) => a.length - b.length)

		const rawModelsFile: string = "" + `${models.map((model) => `import { ${model} } from '../models/${model}'\r`).join("")}\r` + `export { ${models.map((model) => `\r\t${model},`).join("")}\r}`

		this.writeFile("src/utils/models.ts", rawModelsFile)
	}
}
