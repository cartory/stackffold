import { Column, Table } from '../models/table'

let database: Table[] = JSON.parse(
	JSON.stringify(require('../../assets/database.json'))
)

const getForeignKeys = (columns: Column[]): string[] => { 
	return columns
		.filter(({ references }) => references.id)
		.map(({ references }) => references.id)
}

const getReferencedTables = (tables: Table[], foreignKeys: string[]): Table[] => { 
	return tables.filter(({ columns }) => { 
		return columns.some(({ id }) => foreignKeys.indexOf(id) >= 0)
	})
}

const generateFiles = (tables: Table[]) => { 
	tables.forEach(table => { 
		if (!table.marked) { 
			table.marked = true
			let foreignKeys: string[] = getForeignKeys(table.columns)
			let referencedTables: Table[] = getReferencedTables(tables, foreignKeys)

			generateFiles(referencedTables)
			console.log(`${table.name} => GENERATED`);
		}
	})
}

generateFiles(database)
