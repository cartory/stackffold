import fs from 'fs'
import { Table, Column } from '../models/table'

let vpp = require('../../assets/vpp.json')
let rawVpp = JSON.stringify(vpp).replace(/@_/igm, '')

vpp = JSON.parse(rawVpp)

fs.writeFileSync('assets/vpp.json', rawVpp, { encoding: 'utf-8' })

let database: Table[] = vpp.Project.Models.DBTable.map(table => { 
	return {
		id: table.Id,
		name: table.Name,
		dataModel: table.DataModel,
		columns: table.ModelChildren.DBColumn.map(column => { 
			let { ForeignKeyConstraints } = column
			
			let refColumn: string
			
			if (ForeignKeyConstraints) { 
				refColumn = ForeignKeyConstraints.DBForeignKeyConstraint.RefColumn
			}			
			
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
				references: ForeignKeyConstraints
					? ForeignKeyConstraints.DBForeignKeyConstraint.RefColumn
					: null
			} as Column
		})
	} as Table
})

fs.writeFileSync('assets/database.json', JSON.stringify(database), {
	encoding: 'utf-8'
})