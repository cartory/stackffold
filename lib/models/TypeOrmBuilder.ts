import { getDataType } from '../utils/constants'
import { Table, TableBuilder } from './table'

export class TypeOrmBuilder extends TableBuilder {
	public buildModel({ name, columns }: Table): void {
		this.data = (''
			+ "import { EntitySchema } from 'typeorm'\r\n\n"
			+ `export interface ${name} {\r`
			+ `${columns.map(({ name, type }) => `\t${name}: ${getDataType(type)}`).join('\r')}\r}\r\n\n`
			+ `export const ${name}Entity = new EntitySchema<${name}>({\r`
			+ `\tname: '${name}',\r`
			+ `\ttableName: '${name}',\r`
			+ `\tcolumns: {\r${columns.map(column => { 
				let rawColumnOptions = ''
				let jsonColumn = JSON.parse(JSON.stringify(column))
				
				delete jsonColumn['id']
				delete jsonColumn['references']
				
				jsonColumn['generated'] = jsonColumn['generated'] == 'increment'

				for (const key in jsonColumn) {
					let value = jsonColumn[key]
					if (jsonColumn[key]) { 
						value = typeof jsonColumn[key] == 'string' ? `'${value}'`: value
						rawColumnOptions += `\t\t\t${key}: ${value},\r`
					}
				}

				return `\t\t${column.name}: {\r${rawColumnOptions}\t\t},`
			}).join('\r\n')}\r\t},\n`
			+ '})'
		)

		this.path = `src/models/${name}.ts`

		this.writeFile()
	}

	public buildController({ name }: Table): void {
		let lowerName: string = name.toLocaleLowerCase()

		this.data = (''
			+ "import { Response } from 'express'\n"
			+ "import { getRepository } from 'typeorm'\n"
			+ "import {\r\tResponse as Res,\r\tGet, Post, Delete,\r\tBody, Params, Controller,\r} from '@decorators/express'"
			+ `\r\n\nimport { ${name}, ${name}Entity } from '../models/${name}'\r\n\n`
			+ `@Controller('/${lowerName}s')\r`
			+ `export class ${name}Controller {\r\tprotected repository = getRepository(${name}Entity)\r\n\n`
			// findAll
			+ `\t@Get('/')\r\tfindAll(@Res() res: Response<${name}[]>): Promise<Response<${name}[]>> {\r`
			+ `\t\treturn this.repository\r\t\t\t.find()\r\t\t\t.then(${lowerName}s => res.json(${lowerName}s))\r`
			+ `\t\t\t.catch(err => res.set('err', err).json([]))\r\t}\r\n\n`
			// findOne
			+ `\t@Get('/:id')\r\tfindOne(@Params('id') id: number, @Res() res: Response<${name}>): Promise<Response<${name}>> {\r`
			+ `\t\treturn this.repository\r\t\t\t.findOne(id)\r\t\t\t.then(${lowerName} => res.json(${lowerName}))\r`
			+ `\t\t\t.catch(err => res.set('err', err).json(null))\r\t}\r\n\n`
			// save
			+ `\t@Post('/')\r\tsave(@Body() ${lowerName}: ${name}, @Res() res: Response<${name}>): Promise<Response<${name}>> {\r`
			+ `\t\treturn this.repository\r\t\t\t.save(${lowerName})\r\t\t\t.then(${lowerName} => res.json(${lowerName}))\r`
			+ `\t\t\t.catch(err => res.set('err', err).json(null))\r\t}\r\n\n`
			// delete
			+ `\t@Delete('/:id')\r\tdestroy(@Params('id') id: number, @Res() res: Response): Promise<Response> {\r`
			+ `\t\treturn this.repository\r\t\t\t.delete(id)\r\t\t\t.then(result => res.json(result))\r`
			+ `\t\t\t.catch(err => res.set('err', err).json(null))\r\t}\r\n}`
		)

		this.path = `src/controllers/${name}Controller.ts`
		this.writeFile()
	}
}