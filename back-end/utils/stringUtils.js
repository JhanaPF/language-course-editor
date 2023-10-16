
const lowercaseFields = (object) => {
	return mongoose.Types.ObjectId.isValid(id)
}

function randomString(length) {
	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	let result = ""

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length)
		result += charset.charAt(randomIndex)
	}

	return result
}

module.exports = {
	lowercaseFields,
	randomString
}