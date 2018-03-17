import { SENT_LOCATION } from '../actions/location'

const initialState = {
	location: null
}

export default function locationReducer(state = initialState, action) {
	if (action.type === SENT_LOCATION) {
		return { ...state, location: action.location }
	}
	return state
}
