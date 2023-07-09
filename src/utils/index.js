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

        if (obj) {
            Object.entries(obj).forEach(([key, value]) => {
                option[key] = (typeof value === "function") ? value(item) : item[value];
            });
        }

        return option;
    });
}

function isEqualArrayOfObject(arr1, arr2, obj) {
    if (arr1.length === arr2.length) {
        for (let i = 0; i < arr1.length; i++) {
            const elem1 = arr1[i];
            const elem2 = arr2[i];

            for (const key in obj) {
                if (Object.hasOwnProperty.call(obj, key)) {
                    const value = obj[key];

                    if (["string", "number", "boolean"].includes(typeof elem1[key])) {
                        if (elem1[key] !== elem2[value]) {
                            return false
                        }
                    }
                }
            }
        }

        return true;
    }

    return false;
}

export {
    convertToMultipartFormData,
    isEqualArrayOfObject,
    convertTo12HourFormat,
    transFormIntoOptions,
    isValidJson,
    getSender,
    capatalize,
    elipsis,
};