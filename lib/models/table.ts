import fs from 'fs'

export interface Table {
	id: string
	name: string
	dataModel: string
	
	marked: boolean
	columns: Column[]
}

export interface Column {
	id: string
	name: string
	type: string
	generated?: string
	
	default?: any
	length?: number

	unique?: boolean
	primary?: boolean
	nullable?: boolean

	references?: Reference
}

export interface Reference { 
	id: string
	tableName: string
	columnName: string
	relationship: string
}

export abstract class TableBuilder {
	protected path: string
	protected data: string
	protected tableNames: string[] = []

	public buildTable(table: Table): void { 
		this.buildModel(table)
		if (table.dataModel == 'Physical') { 
			this.buildController(table)
			this.tableNames.push(table.name)
		}
		
		console.log(`${table.name} => GENERATED`);
	}

	public buildServer(): void {
		this.buildIndex()
		this.buildRoutes()
	}

	protected writeFile(): void {
		fs.writeFile(this.path, this.data, {
			encoding: 'utf-8'
		}, err => err && console.error(err))
	}

	protected buildRoutes(): void {
		this.tableNames.sort((a, b) => a.length - b.length)

		this.data = (''
			+ "import { Router } from 'express'\n"
			+ "import { attachControllers } from '@decorators/express'\n\n"
			+ `${this.tableNames.map(name => {
				return `import { ${name}Controller } from './controllers/${name}Controller'`
			}).join('\n')}\n\nconst router = Router()\n\n`
			+ `attachControllers(router, [\n${this.tableNames.map(name => `\t${name}Controller,`).join('\n')}\n])\n\n`
			+ 'export default router'
		)

		this.path = 'src/router.ts'
		this.writeFile()
	}

	protected abstract buildIndex(): void
	protected abstract buildModel(table: Table): void
	protected abstract buildController(table: Table): void
}
