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
  const jsonString =
    typeof jsonInput === "string" ? jsonInput : JSON.stringify(jsonInput);

  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
}

function getSender(currentUser, users) {
  return users[0]._id === currentUser._id ? users[1] : users[0];
}

function capatalize(str) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

function elipsis(str, limit = 51) {
  return str.length > limit - 1 ? str.substring(0, limit) + "..." : str;
}

function convertTo12HourFormat(dateString) {
  const date = new Date(dateString);
  const options = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
}

function transFormIntoOptions(array, label, value, obj) {
  return array.map((item) => {
    const option = {
      label: typeof label === "function" ? label(item) : item[label],
      value: typeof value === "function" ? value(item) : item[value],
    };

    if (obj) {
      Object.entries(obj).forEach(([key, value]) => {
        option[key] = typeof value === "function" ? value(item) : item[value];
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
              return false;
            }
          }
        }
      }
    }

    return true;
  }

  return false;
}

// Function to change the position of an object in the array
function changeObjectPosition(array, objectIndex, newPosition) {
  if (objectIndex === -1) {
    console.error("Object not found in the array");
    return array; // Return the original array if the object is not found
  }

  const object = array.splice(objectIndex, 1)[0]; // Remove the object from the array
  array.splice(newPosition, 0, object); // Insert the object at the new position

  return array;
}

function findArrayDiff(before, after) {
  const addedEntries = after.filter(
    (entry) => !before.find((beforeEntry) => beforeEntry._id === entry._id)
  );
  const removedEntries = before.filter(
    (entry) => !after.find((afterEntry) => afterEntry._id === entry._id)
  );
  return { addedEntries, removedEntries };
}

const handleCopyToClipboard = (text) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
};

export {
  convertToMultipartFormData,
  isEqualArrayOfObject,
  convertTo12HourFormat,
  transFormIntoOptions,
  changeObjectPosition,
  isValidJson,
  getSender,
  capatalize,
  elipsis,
  findArrayDiff,
  handleCopyToClipboard,
};
