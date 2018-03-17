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
	DELETE_REQUESTS_ERROR
} from '../actions/rides'

const initialState = {
	rides: null,
	filteredRides: null,
	loading: false,
	error: null,
	matchedRide: null,
	hostForm: false
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
		newState = { ...state, error: null, matchedRide: action.ride }
		return newState
	}
	if (action.type === FETCH_RIDE_ERROR) {
		newState = { ...state, matchedRide: null, error: action.error }
		return newState
	}
	if (action.type === DELETE_REQUESTS_ERROR) {
		newState = { ...state, error: action.error }
		return newState
	}
	return state
}
