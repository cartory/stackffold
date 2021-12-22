import { getDataType } from "../utils/constants";
import { Table, TableBuilder } from "./table";

export class TypeOrmBuilder extends TableBuilder {
	protected buildIndex(): void {
		const data =
			"" +
			"import cors from 'cors'\nimport dotenv from 'dotenv'\nimport express from 'express'\n\n" +
			// import typeOrm
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
			"main(app)\n\t.then(() => console.log(new Date()))\n\t.catch(err => console.error(err))";

		// this.path = 'src/index.ts'
		this.writeFile("src/index.ts", data);
	}

	protected buildModel({ name, columns }: Table): void {
		const data =
			"" +
			"import { EntitySchema } from 'typeorm'\r\n\n" +
			`export interface ${name} {\r` +
			`${columns.map(({ name, type }) => `\t${name}: ${getDataType(type)}`).join("\r")}\r}\r\n\n` +
			`export const ${name}Entity = new EntitySchema<${name}>({\r` +
			`\tname: '${name}',\r` +
			`\ttableName: '${name}',\r` +
			`\tcolumns: {\r${columns
				.map((column) => {
					let rawColumnOptions = "";
					let jsonColumn = JSON.parse(JSON.stringify(column));

					delete jsonColumn["id"];
					delete jsonColumn["references"];

					jsonColumn["generated"] = jsonColumn["generated"] == "increment";

					getDataType(jsonColumn["type"]) == "number" && delete jsonColumn["length"];

					for (const key in jsonColumn) {
						let value = jsonColumn[key];
						if (jsonColumn[key]) {
							value = typeof jsonColumn[key] == "string" ? `'${value}'` : value;
							rawColumnOptions += `\t\t\t${key}: ${value},\r`;
						}
					}

					return `\t\t${column.name}: {\r${rawColumnOptions}\t\t},`;
				})
				.join("\r\n")}\r\t},\n` +
			"})";

		// this.path = `src/models/${name}.ts`;
		this.writeFile(`src/models/${name}.ts`, data);
	}

	protected buildController({ name }: Table): void {
		let lowerName: string = name.toLocaleLowerCase();

		const data =
			"" +
			"import { Response } from 'express'\nimport { getRepository } from 'typeorm'\n" +
			"import {\r\tResponse as Res,\r\tGet, Post, Delete,\r\tBody, Params, Controller,\r} from '@decorators/express'" +
			`\r\n\nimport { ${name}, ${name}Entity } from '../models/${name}'\r\n\n` +
			`@Controller('/${lowerName}s')\r` +
			`export class ${name}Controller {\r\tprotected repository = getRepository(${name}Entity)\r\n\n` +
			// findAll
			`\t@Get('/')\r\tasync findAll(@Res() res: Response<${name}[]>): Promise<Response<${name}[]>> {\r` +
			`\t\treturn this.repository\r\t\t\t.find()\r\t\t\t.then(${lowerName}s => res.json(${lowerName}s))\r` +
			`\t\t\t.catch(err => res.set('err', err).json([]))\r\t}\r\n\n` +
			// findOne
			`\t@Get('/:id')\r\tasync findOne(@Params('id') id: number, @Res() res: Response<${name}>): Promise<Response<${name}>> {\r` +
			`\t\treturn this.repository\r\t\t\t.findOne(id)\r\t\t\t.then(${lowerName} => res.json(${lowerName}))\r` +
			`\t\t\t.catch(err => res.set('err', err).json(null))\r\t}\r\n\n` +
			// save
			`\t@Post('/')\r\tasync save(@Body() ${lowerName}: ${name}, @Res() res: Response<${name}>): Promise<Response<${name}>> {\r` +
			`\t\treturn this.repository\r\t\t\t.save(${lowerName})\r\t\t\t.then(${lowerName} => res.json(${lowerName}))\r` +
			`\t\t\t.catch(err => res.set('err', err).json(null))\r\t}\r\n\n` +
			// delete
			`\t@Delete('/:id')\r\tasync destroy(@Params('id') id: number, @Res() res: Response): Promise<Response> {\r` +
			`\t\treturn this.repository\r\t\t\t.delete(id)\r\t\t\t.then(result => res.json(result))\r` +
			`\t\t\t.catch(err => res.set('err', err).json(null))\r\t}\r\n}`;

		// this.path = `src/controllers/${name}Controller.ts`;
		this.writeFile(`src/controllers/${name}Controller.ts`, data);
	}
}
