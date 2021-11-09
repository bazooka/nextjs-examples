// All functions assume name is UpperCamelCase

export function convertToDashCase(name) {
    var result = name.split(/([A-Z][a-z]+)/);
    return result.filter(part => part).join('-').toLowerCase();
}

export function convertToSnakeCase(name) {
    var result = name.split(/([A-Z][a-z]+)/);
    return result.filter(part => part).join('_').toLowerCase();
}

export function convertToScreamingSnakeCase(name) {
    var result = name.split(/([A-Z][a-z]+)/);
    return result.filter(part => part).join('_').toUpperCase();
}

export function convertLowerCamelCase(name) {
    return name.charAt(0).toLowerCase() + name.slice(1);
}
