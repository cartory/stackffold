import { getDataType } from './constants'
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
	public buildController(table: Table): void {
		this.writeFile()
	}
}