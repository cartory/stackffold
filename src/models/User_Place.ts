import { EntitySchema } from 'typeorm'

export interface User_Place {	Userid: number	Placeid: number	startTime: number	endTime: number	startDate: string	endDate: string}

export const User_PlaceEntity = new EntitySchema<User_Place>({	name: 'User_Place',	tableName: 'User_Place',	columns: {		Userid: {			name: 'Userid',			type: 'int',			primary: true,		},
		Placeid: {			name: 'Placeid',			type: 'int',			primary: true,		},
		startTime: {			name: 'startTime',			type: 'int',		},
		endTime: {			name: 'endTime',			type: 'int',		},
		startDate: {			name: 'startDate',			type: 'date',		},
		endDate: {			name: 'endDate',			type: 'date',		},	},
})