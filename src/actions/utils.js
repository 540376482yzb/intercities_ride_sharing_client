export const normalizeResponseErrors = res => {
	if (!res.ok) {
		if (
			res.headers.has('content-type') &&
			res.headers.get('content-type').startWith('application/json')
		) {
			return res.json().then(err => Promise.reject(err))
		}
		return Promise.reject({
			code: res.status,
			message: res.statusText
		})
	}
	return res
}

export const SEARCH_OPEN = 'SEARCH_OPEN'
export const searchOpen = () => ({
	type: SEARCH_OPEN
})
export const SEARCH_CLOSE = 'SEARCH_CLOSE'
export const searchClose = () => ({
	type: SEARCH_CLOSE
})
export const HOST_OPEN = 'HOST_OPEN'
export const hostOpen = () => ({
	type: HOST_OPEN
})
export const HOST_CLOSE = 'HOST_CLOSE'
export const hostClose = () => ({
	type: HOST_CLOSE
})
