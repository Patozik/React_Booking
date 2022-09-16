export const objectToArrayWithId = obj => {
    const array = [];
    for (const key in obj) {
        array.push({ ...obj[key], id: key });
    }
    return array;
};