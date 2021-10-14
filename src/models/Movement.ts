import { EntitySchema } from 'typeorm'

export interface Movement {	id: number	reason: string	description: string	placeFrom_id: number	placeTo_id: number	Equipmentid: number}

export const MovementEntity = new EntitySchema<Movement>({	name: 'Movement',	tableName: 'Movement',	columns: {		id: {			name: 'id',			type: 'int',			primary: true,			generated: true,		},
		reason: {			name: 'reason',			type: 'varchar',			length: 50,		},
		description: {			name: 'description',			type: 'text',		},
		placeFrom_id: {			name: 'placeFrom_id',			type: 'int',		},
		placeTo_id: {			name: 'placeTo_id',			type: 'int',		},
		Equipmentid: {			name: 'Equipmentid',			type: 'int',		},	},
})