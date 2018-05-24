import { SEARCH_OPEN, SEARCH_CLOSE } from '../actions/utils'

const initialState = {
	searchOpen: false
}

export default function controlReducer(state = initialState, action) {
	switch (action.type) {
	case SEARCH_OPEN:
		return { searchOpen: true }
	case SEARCH_CLOSE:
		return { searchOpen: false }
	default:
		return state
	}
}
