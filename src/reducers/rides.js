import {
	FETCH_RIDES_ERROR,
	FETCH_RIDES_REQUEST,
	FETCH_RIDES_SUCCESS,
	HOST_FORM_CLOSE,
	HOST_FORM_OPEN,
	NARROW_SEARCH,
	CLEAR_SEARCH,
	ASK_FOR_RIDE_ERROR,
	ACCEPT_RIDE_ERROR,
	FETCH_RIDE_ERROR,
	FETCH_RIDE_SUCCESS,
	DELETE_REQUESTS_ERROR,
	DELETE_REQUESTS_SUCCESS,
	EDIT_RIDE_ERROR,
	EDIT_RIDE_SUCCESS,
	ADD_RIDE_SUCCESS,
	ADD_RIDE_ERROR,
	CANCEL_MATCH_ERROR,
	CANCEL_MATCH_SUCCESS,
	DELETE_RIDE_ERROR,
	DELETE_RIDE_SUCCESS,
	DELETE_RIDE_REQUEST,
	REQUEST_MATCH_LOCK_SUCCESS,
	REQUEST_MATCH_UNLOCK_SUCCESS
} from '../actions/rides'

const initialState = {
	rides: null,
	filteredRides: null,
	loading: false,
	error: null,
	deletingRide: false,
	matchedRide: null
}
export default function rideReducer(state = initialState, action) {
	let newState
	if (action.type === FETCH_RIDES_REQUEST) {
		newState = { ...state, loading: true }
		return newState
	}
	if (action.type === FETCH_RIDES_SUCCESS) {
		newState = {
			...state,
			loading: false,
			rides: [...action.rides],
			error: null
		}
		return newState
	}
	if (action.type === FETCH_RIDES_ERROR) {
		newState = { ...state, loading: false, error: action.error }
		return newState
	}
	if (action.type === NARROW_SEARCH) {
		newState = { ...state, filteredRides: action.rides }
		return newState
	}
	if (action.type === CLEAR_SEARCH) {
		newState = { ...state, filteredRides: null }
		return newState
	}
	if (action.type === HOST_FORM_OPEN) {
		newState = { ...state, hostForm: true }
		return newState
	}
	if (action.type === HOST_FORM_CLOSE) {
		newState = { ...state, hostForm: false }
		return newState
	}
	if (action.type === ACCEPT_RIDE_ERROR) {
		newState = { ...state, error: action.error }
		return newState
	}
	if (action.type === ASK_FOR_RIDE_ERROR) {
		newState = { ...state, error: action.error }
		return newState
	}
	if (action.type === FETCH_RIDE_SUCCESS) {
		console.log('from ride reducer')
		newState = { ...state, error: null, matchedRide: action.ride }
		return newState
	}
	if (action.type === FETCH_RIDE_ERROR) {
		newState = { ...state, matchedRide: null, error: action.error }
		return newState
	}
	if (action.type === DELETE_REQUESTS_SUCCESS) {
		let updateRequests
		const rides = state.rides.map(ride => {
			if (ride.id === action.ride.id) {
				updateRequests = ride.requests.filter(request => request !== action.passengerId)
				ride.requests = updateRequests
			}
			return ride
		})
		return { ...state, rides, error: null }
	}
	if (action.type === DELETE_REQUESTS_ERROR) {
		newState = { ...state, error: action.error }
		return newState
	}
	if (action.type === EDIT_RIDE_ERROR) {
		return { ...state, error: action.error }
	}
	if (action.type === EDIT_RIDE_SUCCESS) {
		return { ...state, error: null }
	}
	if (action.type === ADD_RIDE_ERROR) {
		return { ...state, error: action.error }
	}
	if (action.type === ADD_RIDE_SUCCESS) {
		return { ...state, error: null }
	}

	if (action.type === CANCEL_MATCH_ERROR) {
		return { ...state, error: action.error }
	}
	if (action.type === CANCEL_MATCH_SUCCESS) {
		const rides = state.rides.filter(ride => ride.id !== action.matchedRideId)
		return { ...state, error: null, rides, matchedRide: null }
	}
	if (action.type === DELETE_RIDE_REQUEST) {
		return { ...state, error: null, deletingRide: true }
	}
	if (action.type === DELETE_RIDE_ERROR) {
		return { ...state, error: action.error }
	}
	if (action.type === DELETE_RIDE_SUCCESS) {
		return { ...state, error: null, deletingRide: false }
	}
	if (action.type === REQUEST_MATCH_LOCK_SUCCESS) {
		console.log('lock')
		return { ...state, error: null, matchedRide: { ...state.matchedRide, lock: true } }
	}
	if (action.type === REQUEST_MATCH_UNLOCK_SUCCESS) {
		console.log('unlock')
		return { ...state, error: null, matchedRide: { ...state.matchedRide, lock: false } }
	}

	return state
}
