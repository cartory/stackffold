import { EntitySchema } from 'typeorm'

export interface Task {

export const TaskEntity = new EntitySchema<Task>({
		name: {
		description: {
		deadLine: {
		status: {
		Placeid: {
		photoUrl: {
})