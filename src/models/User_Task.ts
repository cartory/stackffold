import { EntitySchema } from 'typeorm'

export interface User_Task {	Userid: number	Taskid: number	startDate: string	endDate: string}

export const User_TaskEntity = new EntitySchema<User_Task>({	name: 'User_Task',	tableName: 'User_Task',	columns: {		Userid: {			name: 'Userid',			type: 'int',			primary: true,		},
		Taskid: {			name: 'Taskid',			type: 'int',			primary: true,		},
		startDate: {			name: 'startDate',			type: 'date',		},
		endDate: {			name: 'endDate',			type: 'date',		},	},
})