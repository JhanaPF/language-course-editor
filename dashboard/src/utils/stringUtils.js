function capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * @param {Array} params [{key: value}]
 */
function setUrlParams (params) {
    let url = "";
    params.forEach(param => {url += `?${param.key}=${param.value}`;});
    return url;
}

module.exports = {capitalizeFirstLetter, setUrlParams}