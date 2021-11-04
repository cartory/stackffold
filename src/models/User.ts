import { EntitySchema } from 'typeorm'

export interface User {

export const UserEntity = new EntitySchema<User>({
		uid: {
		name: {
		email: {
		verifiedEmail: {
		photoUrl: {
		password: {
		phoneNumber: {
})