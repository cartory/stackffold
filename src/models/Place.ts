import { EntitySchema } from 'typeorm'

export interface Place {	id: number	code: string	name: string	description: string	Typeid: number	photoUrl: string}

export const PlaceEntity = new EntitySchema<Place>({	name: 'Place',	tableName: 'Place',	columns: {		id: {			name: 'id',			type: 'int',			primary: true,			generated: true,		},
		code: {			name: 'code',			type: 'varchar',			unique: true,			length: 20,		},
		name: {			name: 'name',			type: 'varchar',			length: 255,		},
		description: {			name: 'description',			type: 'varchar',			length: 255,		},
		Typeid: {			name: 'Typeid',			type: 'int',		},
		photoUrl: {			name: 'photoUrl',			type: 'varchar',			length: 255,		},	},
})