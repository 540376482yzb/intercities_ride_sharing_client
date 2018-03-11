import { API_BASE_URL } from "../config"
export const FETCH_CHEESE_REQUEST = "FETCH_CHEESE_REQUEST"
export const fetchCheeseRequest = () => {
	return {
		type: FETCH_CHEESE_REQUEST
	}
}
export const FETCH_CHEESE_SUCCESS = "FETCH_CHEESE_SUCCESS"
export const fetchCheeseSuccess = cheeses => {
	return {
		type: "FETCH_CHEESE_SUCCESS",
		cheeses
	}
}
export const FETCH_CHEESE_ERROR = "FETCH_CHEESE_ERROR"
export const fetchCheeseError = error => {
	return {
		type: "FETCH_CHEESE_ERROR",
		error: error
	}
}
export const fetchCheese = () => dispatch => {
	dispatch(fetchCheeseRequest())
	return fetch(`${API_BASE_URL}/cheeses`)
		.then(res => {
			console.log("receiving data")
			return res.json()
		})
		.then(cheeses => {
			dispatch(fetchCheeseSuccess(cheeses))
		})
		.catch(err => dispatch(fetchCheeseError(err)))
}

export const ADD_CHEESE_REQUEST = "ADD_CHEESE_REQUEST"
export const addCheeseRequest = () => {
	return {
		type: ADD_CHEESE_REQUEST
	}
}
export const ADD_CHEESE_SUCCESS = "ADD_CHEESE_SUCCESS"
export const addCheeseSuccess = cheese => {
	return {
		type: "ADD_CHEESE_SUCCESS",
		cheese
	}
}
export const ADD_CHEESE_ERROR = "ADD_CHEESE_ERROR"
export const addCheeseError = error => {
	return {
		type: "ADD_CHEESE_ERROR",
		error: error
	}
}

export const addCheese = cheese => dispatch => {
	dispatch(addCheeseRequest())
	return fetch(`${API_BASE_URL}/cheeses`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(cheese)
	})
		.then(res => res.json())
		.then(cheese => {
			console.log(cheese)
			dispatch(addCheeseSuccess(cheese))
		})
		.catch(err => dispatch(addCheeseError(err)))
}
