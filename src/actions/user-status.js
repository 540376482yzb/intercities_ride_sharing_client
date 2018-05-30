import {API_BASE_URL} from '../config'
import {normalizeResponseErrors} from './utils'

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

export const reviewUser = (userId, hostId, review) => (dispatch, getState) => {
	const authToken = getState().auth.authToken
	return fetch(`${API_BASE_URL}/user/review/${userId}`, {
		method: 'PUT',
		body: JSON.stringify({userId, hostId, review}),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
}
