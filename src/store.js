import {createStore, applyMiddleware, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import rideReducer from './reducers/rides'
import authReducer from './reducers/auth'
import locationReducer from './reducers/location'
import {setAuthToken, refreshAuthToken} from './actions/auth'
import {loadAuthToken} from './local-storage'
import socketReducer from './reducers/socket'
import control from './reducers/control'
import io from 'socket.io-client'
import {initializeSocket} from './actions/socket'
export const store = createStore(
	combineReducers({
		rideReducer,
		locationReducer,
		form: formReducer,
		auth: authReducer,
		socket: socketReducer,
		control
	}),
	composeWithDevTools(applyMiddleware(thunk))
)

//persist autoToken into local storage
const authToken = loadAuthToken()
if (authToken) {
	store.dispatch(setAuthToken(authToken))
	store.dispatch(refreshAuthToken())
}
export default store
