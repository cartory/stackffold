import { EntitySchema } from 'typeorm'

export interface Type {	id: number	name: string}

export const TypeEntity = new EntitySchema<Type>({	name: 'Type',	tableName: 'Type',	columns: {		id: {			name: 'id',			type: 'int',			primary: true,			generated: true,		},
		name: {			name: 'name',			type: 'varchar',			unique: true,			length: 50,		},	},
})