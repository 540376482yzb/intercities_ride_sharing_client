import { API_BASE_URL } from '../config'
import { normalizeResponseErrors } from './utils'

export const NARROW_SEARCH = 'NARROW_SEARCH'
export const narrowSearch = rides => ({
	type: NARROW_SEARCH,
	rides
})

export const CLEAR_SEARCH = 'CLEAR_SEARCH'
export const clearSearch = () => ({
	type: CLEAR_SEARCH
})

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

export const fetchRides = () => (dispatch, getState) => {
	const authToken = getState().auth.authToken
	dispatch(fetchRidesRequest())
	fetch(`${API_BASE_URL}/board`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(
			rides => {
				console.log(rides)
				return dispatch(fetchRidesSuccess(rides))
			},
			err => dispatch(fetchRidesError(err))
		)
}

export const HOST_FORM_OPEN = 'HOST_FORM_OPEN'
export const hostFormOpen = () => ({
	type: HOST_FORM_OPEN
})

export const HOST_FORM_CLOSE = 'HOST_FORM_CLOSE'
export const hostFormClose = () => ({
	type: HOST_FORM_CLOSE
})

export const ADD_RIDE_SUCCESS = 'ADD_RIDE_SUCCESS'
export const addRideSuccess = () => ({
	type: ADD_RIDE_SUCCESS
})
export const ADD_RIDE_ERROR = 'ADD_RIDE_ERROR'
export const addRideError = error => ({
	type: ADD_RIDE_ERROR,
	error
})
export const addRide = ride => (dispatch, getState) => {
	dispatch(fetchRidesRequest())
	const authToken = getState().auth.authToken
	return fetch(`${API_BASE_URL}/board`, {
		method: 'POST',
		body: JSON.stringify(ride),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(rides => dispatch(addRideSuccess()), err => dispatch(addRideError(err)))
}

export const ASK_FOR_RIDE_ERROR = 'ASK_FOR_RIDE_ERROR'
export const askForRideError = error => ({
	type: ASK_FOR_RIDE_ERROR,
	error
})
export const ASK_FOR_RIDE_SUCCESS = 'ASK_FOR_RIDE_SUCCESS'
export const askForRideSuccess = rideId => ({
	type: ASK_FOR_RIDE_SUCCESS,
	rideId
})
export const askForRide = (rideId, userId) => (dispatch, getState) => {
	const authToken = getState().auth.authToken

	return fetch(`${API_BASE_URL}/board/requests/${rideId}`, {
		method: 'PUT',
		body: JSON.stringify({ userId }),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(
			res => dispatch(askForRideSuccess(res.content.ride.id)),
			err => dispatch(askForRideError(err))
		)
}

export const ACCEPT_RIDE_ERROR = 'ACCEPT_RIDE_ERROR'
export const acceptRideError = error => ({
	type: ACCEPT_RIDE_ERROR,
	error
})

export const acceptRide = (driverId, passengerId, rideId) => (dispatch, getState) => {
	const authToken = getState().auth.authToken
	return fetch(`${API_BASE_URL}/board/match/${rideId}`, {
		method: 'PUT',
		body: JSON.stringify({ driverId, passengerId }),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(res => Promise.resolve('done'), err => dispatch(acceptRideError(err)))
}

export const FETCH_RIDE_SUCCESS = 'FETCH_RIDE_SUCCESS'
export const fetchRideSuccess = ride => ({
	type: FETCH_RIDE_SUCCESS,
	ride
})

export const FETCH_RIDE_ERROR = 'FETCH_RIDE_ERROR'
export const fetchRideError = error => ({
	type: FETCH_RIDE_ERROR,
	error
})

export const fetchRide = rideId => (dispatch, getState) => {
	const authToken = getState().auth.authToken
	return fetch(`${API_BASE_URL}/board/${rideId}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
}

export const DELETE_REQUESTS_ERROR = 'DELETE_REQUESTS_ERROR'
export const deleteRequestsError = error => ({
	type: DELETE_REQUESTS_ERROR,
	error
})

export const DELETE_REQUESTS_SUCCESS = 'DELETE_REQUESTS_SUCCESS'
export const deleteRequestsSuccess = ride => ({
	type: DELETE_REQUESTS_SUCCESS,
	ride
})
export const deleteRequests = (rideId, passengerId) => (dispatch, getState) => {
	const authToken = getState().auth.authToken
	fetch(`${API_BASE_URL}/board/requests/${rideId}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${authToken}`
		},
		body: JSON.stringify({ passengerId })
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(() => {
			return dispatch(deleteRequestsSuccess(rideId, passengerId))
		})
		.catch(err => {
			dispatch(deleteRequestsError(err))
		})
}
export const EDIT_RIDE_ERROR = 'EDIT_RIDE_ERROR'
export const editRideError = error => ({
	type: EDIT_RIDE_ERROR,
	error
})
export const EDIT_RIDE_SUCCESS = 'EDIT_RIDE_SUCCESS'
export const editRideSuccess = () => ({
	type: EDIT_RIDE_SUCCESS
})
export const editRide = (id, update) => (dispatch, getState) => {
	const authToken = getState().auth.authToken
	fetch(`${API_BASE_URL}/board/${id}`, {
		method: 'PUT',
		body: JSON.stringify(update),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(
			ride => {
				console.log('action 206', ride)
				dispatch(editRideSuccess(ride))
			},
			err => {
				dispatch(editRideError(err))
			}
		)
}

export const CANCEL_MATCH_SUCCESS = 'CANCEL_MATCH_SUCCESS'
export const cancelMatchSuccess = (matchedRideId, driverId, passengerId) => ({
	type: CANCEL_MATCH_SUCCESS,
	matchedRideId,
	driverId,
	passengerId
})
export const CANCEL_MATCH_ERROR = 'CANCEL_MATCH_ERROR'
export const cancelMatchError = error => ({
	type: CANCEL_MATCH_ERROR,
	error
})
export const cancelMatch = matchedRide => (dispatch, getState) => {
	const authToken = getState().auth.authToken
	const driverId = matchedRide.match[0].id
	const passengerId = matchedRide.match[1].id
	return fetch(`${API_BASE_URL}/board/match/${matchedRide.id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		},
		body: JSON.stringify({ driverId, passengerId })
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(
			res => {
				return dispatch(cancelMatchSuccess(matchedRide.id, driverId, passengerId))
			},
			err => {
				return dispatch(cancelMatchError(err))
			}
		)
}

export const DELETE_RIDE_REQUEST = 'DELETE_RIDE_REQUEST'
export const deleteRideRequest = () => ({
	type: DELETE_RIDE_REQUEST
})
export const DELETE_RIDE_SUCCESS = 'DELETE_RIDE_SUCCESS'
export const deleteRideSuccess = () => ({
	type: DELETE_RIDE_SUCCESS
})
export const DELETE_RIDE_ERROR = 'DELETE_RIDE_ERROR'
export const deleteRideError = error => ({
	type: DELETE_RIDE_ERROR,
	error
})
export const deleteRide = (rideId, currentUserId) => (dispatch, getState) => {
	const authToken = getState().auth.authToken
	return fetch(`${API_BASE_URL}/board/${rideId}`, {
		method: 'DELETE',
		body: JSON.stringify({ currentUserId }),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
}

export const REQUEST_MATCH_LOCK_SUCCESS = 'REQUEST_MATCH_LOCK_SUCCESS'
export const requestMatchLockSuccess = () => ({
	type: REQUEST_MATCH_LOCK_SUCCESS
})
export const REQUEST_MATCH_UNLOCK_SUCCESS = 'REQUEST_MATCH_UNLOCK_SUCCESS'
export const requestMatchUnLockSuccess = () => ({
	type: REQUEST_MATCH_UNLOCK_SUCCESS
})

export const requestMatchLock = rideId => (dispatch, getState) => {
	const authToken = getState().auth.authToken
	const user = getState().auth.currentUser
	return fetch(`${API_BASE_URL}/board/match/${rideId}`, {
		method: 'PUT',
		body: JSON.stringify({ driverId: user.id, manualLock: 'lock' }),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(() => dispatch(requestMatchLockSuccess()))
}

export const requestMatchUnLock = rideId => (dispatch, getState) => {
	const authToken = getState().auth.authToken
	const user = getState().auth.currentUser
	return fetch(`${API_BASE_URL}/board/match/${rideId}`, {
		method: 'PUT',
		body: JSON.stringify({ driverId: user.id, manualLock: 'unlock' }),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(() => dispatch(requestMatchUnLockSuccess()))
}
