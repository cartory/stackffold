import { EntitySchema } from 'typeorm'

export interface Place {

export const PlaceEntity = new EntitySchema<Place>({
		code: {
		name: {
		description: {
		Typeid: {
		photoUrl: {
})