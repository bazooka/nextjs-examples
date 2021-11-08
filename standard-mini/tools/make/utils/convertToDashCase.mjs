
/**
 * Takes a name and returns a css class name
 * @param {String} name
 * @returns {String}
 */
function convertToDashCase(name) {
    var result = name.split(/([A-Z][a-z]+)/);
    return result.filter(part => part).join('-').toLowerCase();
}

export default convertToDashCase