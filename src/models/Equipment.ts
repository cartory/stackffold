import { EntitySchema } from 'typeorm'

export interface Equipment {	id: number	description: string	code: string	photoUrl: string}

export const EquipmentEntity = new EntitySchema<Equipment>({	name: 'Equipment',	tableName: 'Equipment',	columns: {		id: {			name: 'id',			type: 'int',			primary: true,			generated: true,		},
		description: {			name: 'description',			type: 'text',		},
		code: {			name: 'code',			type: 'varchar',			unique: true,			length: 100,		},
		photoUrl: {			name: 'photoUrl',			type: 'varchar',			length: 255,		},	},
})