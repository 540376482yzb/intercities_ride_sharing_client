export const required = value => (value ? undefined : 'Field can not be empty')
export const tooShort = value =>
	value.length > 5 ? undefined : 'Password must be at least 5 characters long'
export const noEmpty = value =>
	value.trim() === '' ? 'Can\'t fill with white space' : undefined

export const confirmPassword = field => (value, allValues) => {
	if (field in allValues && value.trim() === allValues[field].trim()) {
		console.log('match')
		return undefined
	}
	return 'password is not matched'
}
