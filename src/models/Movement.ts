import { EntitySchema } from 'typeorm'

export interface Movement {

export const MovementEntity = new EntitySchema<Movement>({
		reason: {
		description: {
		placeFrom_id: {
		placeTo_id: {
		Equipmentid: {
})