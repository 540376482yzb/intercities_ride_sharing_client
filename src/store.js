import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import rideReducer from './reducers/rides'
export const store = createStore(
	combineReducers({
		rideReducer,
		form: formReducer
	}),
	composeWithDevTools(applyMiddleware(thunk))
)
export default store
