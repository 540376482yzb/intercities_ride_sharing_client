import { API_BASE_URL } from '../config'

export const RECEIVE_USER_SUCCESS = 'RECEIVE_USER_SUCCESS'
export const receiveUserSuccess = user => ({
	type: RECEIVE_USER_SUCCESS,
	user
})

export const RECEIVE_USER_ERROR = 'RECEIVE_USER_ERROR'
export const receiveUserError = error => ({
	type: RECEIVE_USER_ERROR,
	error
})
