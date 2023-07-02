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

function getSender(currentUser, users) {
    return (users[0]._id === currentUser._id) ? users[1] : users[0];
}

function capatalize(str) {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

function elipsis(str, limit = 51) {
    return (str.length > (limit - 1)) ? str.substring(0, limit) + "..." : str;
}

function convertTo12HourFormat(dateString) {
    const date = new Date(dateString);
    const options = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };
    return date.toLocaleString('en-US', options);
}

function transFormIntoOptions(array, label, value, obj) {
    return array.map((item) => {
        const option = {
            label: (typeof label === "function") ? label(item) : item[label],
            value: (typeof value === "function") ? value(item) : item[value],
        };

        Object.entries(obj).forEach(([key, value]) => {
            option[key] = (typeof value === "function") ? value(item) : item[value];
        });

        return option;
    });
}

export {
    convertToMultipartFormData,
    convertTo12HourFormat,
    transFormIntoOptions,
    isValidJson,
    getSender,
    capatalize,
    elipsis,
};