import { API_BASE_URL } from '../config'
import { normalizeResponseErrors } from './utils'
import { SubmissionError } from 'redux-form'
import { saveAuthToken, clearLocalAuthToken } from '../local-storage'
// import jwtDecode from 'jwt-decode'
export const AUTH_USER_REQUEST = 'AUTH_USER_REQUEST'
export const authUserRequest = () => ({
	type: AUTH_USER_REQUEST
})

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN'
export const setAuthToken = authToken => ({
	type: SET_AUTH_TOKEN,
	authToken
})
export const CLEAR_AUTH_TOKEN = 'CLEAR_AUTH_TOKEN'
export const clearAuthToken = () => ({
	type: CLEAR_AUTH_TOKEN
})

export const AUTH_USER_ERROR = 'AUTH_USER_ERROR'
export const authUserError = error => ({
	type: AUTH_USER_ERROR,
	error
})

const storeAuthInfo = (authToken, dispatch) => {
	dispatch(setAuthToken(authToken))
	saveAuthToken(authToken)
}
export const authUser = user => dispatch => {
	dispatch(authUserRequest())
	return fetch(`${API_BASE_URL}/auth/log-in`, {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(
			({ authToken }) => {
				return storeAuthInfo(authToken, dispatch)
			},
			err => {
				return Promise.reject(
					new SubmissionError({
						_error: 'Error submitting message'
					})
				)
			}
		)
}

export const refreshAuthToken = () => (dispatch, getState) => {
	const authToken = getState().auth.authToken
	fetch(`${API_BASE_URL}/auth/refresh`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(({ authToken }) => {
			storeAuthInfo(authToken, dispatch)
		})
		.catch(err => {
			dispatch(authUserError(err))
			dispatch(clearAuthToken())
			clearLocalAuthToken(authToken)
		})
}

export const registerUser = user => dispatch => {
	let password = user.password
	return fetch(`${API_BASE_URL}/user/sign-up`, {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(
			res => {
				return dispatch(authUser({ email: res.email, password }))
			},
			err => {
				return Promise.reject(
					new SubmissionError({
						_error: 'Error submitting message'
					})
				)
			}
		)
}

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const fetchUserSuccess = user => ({
	type: FETCH_USER_SUCCESS,
	user
})

export const FETCH_USER_ERROR = 'FETCH_USER_ERROR'
export const fetchUserError = error => ({
	type: FETCH_USER_ERROR,
	error
})

export const fetchUser = userId => (dispatch, getState) => {
	const authToken = getState().auth.authToken
	return fetch(`${API_BASE_URL}/user/${userId}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
}

export const userLogOut = () => (dispatch, getState) => {
	const authToken = getState().auth.authToken
	dispatch(clearAuthToken())
	clearLocalAuthToken(authToken)
}
