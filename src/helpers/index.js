export function serialize(obj) {
    let queryString = "";
    for (let key in obj) {
        queryString += `&${key}=${obj[key]}`;
    }
    return queryString;
}

export function errorsToString(arErrors) {
    let list = '<ol>'
    for (const key in arErrors)
        list += `<li>${arErrors[key][0]}</li>`
    list += '</ol>'
    return list;
}

export function filterNonNumeric(ev) {
    ev.target.value = ev.target.value.replace(/[^0-9]/g, "");
}

export function convertDateToDB(date) {
    if (!date) return null
    const [day, month, year] = date.split('/')
    return `${year}-${month}-${day}`
}

export function generateHash() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 10;
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
}