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

	references?: string
}

export interface TableFactory {
	createModel(table: Table): string
	createRoute(tableName: string): string
	createController(tableName: string): string
}