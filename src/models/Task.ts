import { EntitySchema } from 'typeorm'

export interface Task {	id: number	name: string	description: string	deadLine: string	status: boolean	Placeid: number	photoUrl: string}

export const TaskEntity = new EntitySchema<Task>({	name: 'Task',	tableName: 'Task',	columns: {		id: {			name: 'id',			type: 'int',			primary: true,			generated: true,		},
		name: {			name: 'name',			type: 'varchar',			length: 50,		},
		description: {			name: 'description',			type: 'varchar',			length: 255,		},
		deadLine: {			name: 'deadLine',			type: 'date',		},
		status: {			name: 'status',			type: 'bit',		},
		Placeid: {			name: 'Placeid',			type: 'int',		},
		photoUrl: {			name: 'photoUrl',			type: 'varchar',			length: 255,		},	},
})