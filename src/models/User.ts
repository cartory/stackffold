import { EntitySchema } from 'typeorm'

export interface User {	id: number	uid: string	name: string	email: string	verifiedEmail: string	photoUrl: string	password: string	phoneNumber: string}

export const UserEntity = new EntitySchema<User>({	name: 'User',	tableName: 'User',	columns: {		id: {			name: 'id',			type: 'int',			primary: true,			generated: true,		},
		uid: {			name: 'uid',			type: 'varchar',			unique: true,			length: 50,		},
		name: {			name: 'name',			type: 'varchar',			length: 50,		},
		email: {			name: 'email',			type: 'varchar',			unique: true,			length: 50,		},
		verifiedEmail: {			name: 'verifiedEmail',			type: 'varchar',			unique: true,			length: 50,		},
		photoUrl: {			name: 'photoUrl',			type: 'varchar',			length: 255,		},
		password: {			name: 'password',			type: 'varchar',			length: 255,		},
		phoneNumber: {			name: 'phoneNumber',			type: 'varchar',			length: 20,		},	},
})