import fs from 'fs'
import { Table, Column, Reference } from '../models/table'

let vpp = require('../../assets/vpp.json')
let rawVpp = JSON.stringify(vpp).replace(/@_/igm, '')

vpp = JSON.parse(rawVpp)
fs.writeFileSync('assets/vpp.json', rawVpp, { encoding: 'utf-8' })

const DB_keys = {
	DBTable: (models) => models,
	Model: (models) => models.Model.ModelChildren,
}

const getDBTable = ({ Models }) => {	
	let DBTableKey = Object.keys(Models).find(k => DB_keys[k])
	return DB_keys[DBTableKey](Models).DBTable
}

let tables: Table[] = getDBTable(vpp.Project).map(table => { 
	return {
		id: table.Id,
		marked: false,
		name: table.Name,
		dataModel: table.DataModel,
		columns: table.ModelChildren.DBColumn.map(column => { 
			let { ForeignKeyConstraints } = column		
			
			let refColum: Reference = ForeignKeyConstraints ? {
				id: ForeignKeyConstraints.DBForeignKeyConstraint.RefColumn as string
			} as Reference : null
			
			return {
				id: column.Id,
				name: column.Name,
				type: column.Type,
			
				unique: column.Unique,
				length: column.Length,
				nullable: column.nullable,
				primary: column.PrimaryKey,
				default: column.DefaultValue,
				generated: column.IdGenerator,
				references: refColum,
			} as Column
		})
	} as Table
})

const getReference = (tables: Table[], idReference: string): Reference => { 
	let columnName: string
	let { name } = tables.find(({ columns }) => columns.some(({ id, name }) => {
		if (id == idReference) { 
			columnName = name
			return true
		}

		return false
	}))
	return {
		id: idReference,
		tableName: name,
		columnName: columnName,
	} as Reference
}

tables.forEach(table => { 
	table.columns.forEach(column => {
		if (column.references) { 
			column.references = getReference(tables, column.references.id)
		}
	})
})

fs.writeFileSync('assets/database.json', JSON.stringify(tables), {
	encoding: 'utf-8'
})