export default function dotwalking(path = "", object) {
    const keys = path.split(".");
    let result = object || {};
    for (let key of keys) {
        if (!result.hasOwnProperty(key)) {
            return undefined;
        }
        result = result[key];
    }
    return result;
}