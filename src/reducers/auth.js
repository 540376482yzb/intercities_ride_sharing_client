import {
	AUTH_USER_ERROR,
	AUTH_USER_REQUEST,
	SET_AUTH_TOKEN,
	CLEAR_AUTH_TOKEN,
	FETCH_USER_ERROR,
	FETCH_USER_SUCCESS
} from '../actions/auth'
import {
	ASK_FOR_RIDE_ERROR,
	ASK_FOR_RIDE_SUCCESS,
	CANCEL_MATCH_ERROR,
	CANCEL_MATCH_SUCCESS
} from '../actions/rides'
const initialState = {
	loading: false,
	error: null,
	authToken: null,
	currentUser: null
}

export default function authReducer(state = initialState, action) {
	let newState
	if (action.type === AUTH_USER_REQUEST) {
		newState = { ...state, loading: true }
		return newState
	}

	if (action.type === AUTH_USER_ERROR) {
		newState = { ...state, loading: false, error: action.error }
		return newState
	}
	if (action.type === SET_AUTH_TOKEN) {
		newState = {
			...state,
			loading: false,
			authToken: action.authToken
		}
		return newState
	}
	if (action.type === CLEAR_AUTH_TOKEN) {
		return initialState
	}
	if (action.type === FETCH_USER_SUCCESS) {
		console.log('line 39', action.user)
		return { ...state, currentUser: action.user, error: null }
	}
	if (action.type === FETCH_USER_ERROR) {
		return { ...state, currentUser: null, error: action.error }
	}
	if (action.type === ASK_FOR_RIDE_SUCCESS) {
		const newRequests = [...state.currentUser.sentRequests, action.rideId]
		const currentUser = { ...state.currentUser, sentRequests: newRequests }
		newState = { ...state, currentUser, error: null }
		return newState
	}
	if (action.type === ASK_FOR_RIDE_ERROR) {
		return { ...state, error: action.error }
	}

	if (action.type === CANCEL_MATCH_ERROR) {
		return { ...state, error: action.error }
	}

	if (action.type === CANCEL_MATCH_SUCCESS) {
		return { ...state, error: action.error, match: null, host: null }
	}
	return state
}
