function convertToMultipartFormData(data) {
    const formData = new FormData();

    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            formData.append(key, data[key]);
        }
    }

    return formData;
}

function isValidJson(jsonInput) {
    const jsonString = typeof jsonInput === 'string' ? jsonInput : JSON.stringify(jsonInput);

    try {
        JSON.parse(jsonString);
        return true;
    } 
    catch (error) {
        return false;
    }
}

export {
    convertToMultipartFormData,
    isValidJson
};