function readFormData (formData) {
    let data = {};
    for (var pair of formData.entries()) {
        var key = pair[0]; 
        var value = pair[1];
        data[key] = value;
    }
    console.log("form data = ", data);
}

module.exports = {readFormData}