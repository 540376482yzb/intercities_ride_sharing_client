import { INITIALIZE_SOCKET } from '../actions/socket'

const initialState = {
	socket: null
}

export default function socketReducer(state = initialState, action) {
	switch (action.type) {
	case INITIALIZE_SOCKET:
		return { ...initialState, socket: action.socket }
	default:
		return state
	}
}
