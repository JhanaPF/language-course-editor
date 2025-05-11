function readFormData (formData) {
    const data = {}
    for (const pair of formData.entries()) {
        const key = pair[0]
        const value = pair[1]
        data[key] = value
    }
    console.log('form data = ', data)
}

module.exports = { readFormData }
