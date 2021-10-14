import { EntitySchema } from 'typeorm'

export interface Place_Place {	placeParent_id: number	placeChild_id: number}

export const Place_PlaceEntity = new EntitySchema<Place_Place>({	name: 'Place_Place',	tableName: 'Place_Place',	columns: {		placeParent_id: {			name: 'placeParent_id',			type: 'int',			primary: true,		},
		placeChild_id: {			name: 'placeChild_id',			type: 'int',			primary: true,		},	},
})