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
	constructor(
		protected path: string,
		protected data: string,
	) { }
	
	protected writeFile(): void {
		fs.writeFile(this.path, this.data, {
			encoding: 'utf-8'
		}, err => err && console.error(err))
	}

	public abstract buildModel(table: Table): void
	public abstract buildController(table: Table): void
}
