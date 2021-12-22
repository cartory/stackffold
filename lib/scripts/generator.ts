import { Column, Table, TableBuilder } from "../models/table"

import { TypeOrmBuilder } from "../models/TypeOrmBuilder"
import { SequelizeBuilder } from "../models/SequelizeBuilder"

let database: Table[] = JSON.parse(JSON.stringify(require("../../assets/database.json")))

const getForeignKeys = (columns: Column[]): string[] => {
	return columns.filter(({ references }) => references).map(({ references }) => references.id)
}

const getReferencedTables = (tables: Table[], foreignKeys: string[]): Table[] => {
	return tables.filter(({ columns }) => {
		return columns.some(({ id }) => foreignKeys.indexOf(id) >= 0)
	})
}

const generateFiles = (tables: Table[], builder: TableBuilder) => {
	tables.forEach((table) => {
		if (!table.marked) {
			table.marked = true
			let foreignKeys: string[] = getForeignKeys(table.columns)
			let referencedTables: Table[] = getReferencedTables(tables, foreignKeys)

			generateFiles(referencedTables, builder)

			builder.buildTable(table)
		}
	})
}

let builder = new SequelizeBuilder()
generateFiles(database, builder)

builder.constructor.name === "SequelizeBuilder" && builder.buildConnection()

builder.buildServer()
