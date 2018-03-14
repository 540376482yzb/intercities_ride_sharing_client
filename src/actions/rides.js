import { API_BASE_URL } from '../config'
import { normalizeResponseErrors } from './utils'
export const FETCH_RIDES_REQUEST = 'FETCH_RIDES_REQUEST'
export const fetchRidesRequest = () => ({
	type: FETCH_RIDES_REQUEST
})
export const FETCH_RIDES_SUCCESS = 'FETCH_RIDES_SUCCESS'
export const fetchRidesSuccess = rides => ({
	type: FETCH_RIDES_SUCCESS,
	rides
})
export const FETCH_RIDES_ERROR = 'FETCH_RIDES_ERROR'
export const fetchRidesError = error => ({
	type: FETCH_RIDES_ERROR,
	error
})

export const fetchRides = () => dispatch => {
	dispatch(fetchRidesRequest())
	fetch(`${API_BASE_URL}/board`, {
		method: 'GET'
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(rides => dispatch(fetchRidesSuccess(rides)))
		.catch(err => {
			console.log(err)
			dispatch(fetchRidesError(err))
		})
}

export const HOST_FORM_OPEN = 'HOST_FORM_OPEN'
export const hostFormOpen = () => ({
	type: HOST_FORM_OPEN
})

export const HOST_FORM_CLOSE = 'HOST_FORM_CLOSE'
export const hostFormClose = () => ({
	type: HOST_FORM_CLOSE
})
