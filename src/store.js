import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {cheeseReducer} from './reducers/scratch'
const store = createStore(
	cheeseReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(thunk)
)
export default store