import {
	AUTH_USER_ERROR,
	AUTH_USER_REQUEST,
	SET_AUTH_TOKEN,
	CLEAR_AUTH_TOKEN
} from '../actions/auth'

const initialState = {
	loading: false,
	error: null,
	authToken: null
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
		// console.log('i am in set auth action')
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
	return state
}
