export const loadAuthToken = () => {
	// console.log('load auth')
	return localStorage.getItem('authToken')
}

export const saveAuthToken = authToken => {
	try {
		localStorage.setItem('authToken', authToken)
	} catch (e) {}
}

export const clearLocalAuthToken = () => {
	try {
		localStorage.removeItem('authToken')
	} catch (e) {}
}
