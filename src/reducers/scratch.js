import {
	FETCH_CHEESE_REQUEST,
	FETCH_CHEESE_SUCCESS,
	FETCH_CHEESE_ERROR,
	ADD_CHEESE_REQUEST,
	ADD_CHEESE_SUCCESS,
	ADD_CHEESE_ERROR
} from "../actions/scratch"

const initialState = {
	cheeses: [],
	loading: false,
	error: null
}

export const cheeseReducer = (state = initialState, action) => {
	let newState
	switch (action.type) {
	case FETCH_CHEESE_REQUEST:
		newState = { ...state, loading: true }
		return newState
	case FETCH_CHEESE_SUCCESS:
		newState = {
			...state,
			loading: false,
			error: null,
			cheeses: action.cheeses
		}
		return newState
	case FETCH_CHEESE_ERROR:
		newState = { ...state, loading: false, error: action.error }
		return newState

	case ADD_CHEESE_REQUEST:
		newState = { ...state, loading: true }
		return newState

	case ADD_CHEESE_SUCCESS:
		newState = {
			...state,
			loading: false,
			cheeses: [...state.cheeses, action.cheese]
		}
		return newState
	case ADD_CHEESE_ERROR:
		console.log("error here")
		newState = {
			...state,
			loading: false,
			error: action.error
		}
		return newState
	default:
		return state
	}
}
