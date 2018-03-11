import { createStore, applyMiddleware, combineReducers } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { cheeseReducer } from "./reducers/scratch"
import { reducer as formReducer } from "redux-form"

export const store = createStore(
	combineReducers({
		cheeseReducer,
		form: formReducer
	}),
	composeWithDevTools(applyMiddleware(thunk))
)
export default store
