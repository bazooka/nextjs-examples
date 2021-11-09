
/**
 * Make sure given names is UpperCamelCase
 * @param {String} name
 */
function nameIsValid(name) {

    const firstIsUpperCase = name.charAt(0) === name.charAt(0).toUpperCase();
    const noDashes = name.indexOf('-') === -1;
    const noUnderscores = name.indexOf('_') === -1;

    if(!firstIsUpperCase || !noDashes || !noUnderscores) {
        console.log(`Name must be ${ 'UpperCamelCase'.red }`);
    }

    return  firstIsUpperCase &&
            noDashes &&
            noUnderscores;
}

export default nameIsValid;
