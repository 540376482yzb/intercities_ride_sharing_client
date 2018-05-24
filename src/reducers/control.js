import { SEARCH_OPEN, SEARCH_CLOSE, HOST_OPEN, HOST_CLOSE } from '../actions/utils'

const initialState = {
	searchOpen: false,
	hostOpen: false
}

export default function controlReducer(state = initialState, action) {
	switch (action.type) {
	case SEARCH_OPEN:
		return { searchOpen: true, hostOpen: false }
	case SEARCH_CLOSE:
		return { searchOpen: false, hostOpen: false }
	case HOST_OPEN:
		return { searchOpen: false, hostOpen: true }
	case HOST_CLOSE:
		return { searchOpen: false, hostOpen: false }
	default:
		return state
	}
}
