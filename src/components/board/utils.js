export const getSanitizedDate = date => {
	const re = 'T00'
	const charIndex = date.search(re)
	return date.slice(0, charIndex)
}
