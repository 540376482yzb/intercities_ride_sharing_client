export const INITIALIZE_SOCKET = 'INITIALIZE_SOCKET'
export const initializeSocket = socket => ({
	type: INITIALIZE_SOCKET,
	socket
})
