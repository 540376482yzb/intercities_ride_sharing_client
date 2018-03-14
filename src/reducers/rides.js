import {
	FETCH_RIDES_ERROR,
	FETCH_RIDES_REQUEST,
	FETCH_RIDES_SUCCESS,
	HOST_FORM_CLOSE,
	HOST_FORM_OPEN
} from '../actions/rides'

const initialState = {
	currentUser: null,
	rides: null,
	loading: false,
	error: null,
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
	if (action.type === HOST_FORM_OPEN) {
		newState = { ...state, hostForm: true }
		return newState
	}
	if (action.type === HOST_FORM_CLOSE) {
		newState = { ...state, hostForm: false }
		return newState
	}

	return state
}
