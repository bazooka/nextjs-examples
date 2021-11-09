/**
 * Takes a template name and returns a type name.
 * 
 * This function exists because the template name
 * comes directly from a directory name and could
 * potentially be something bad in the future. In
 * that case we can map a bad directory name to a
 * nice type name.
 *
 * @param {*} template
 * @returns
 */
const getTypeName = (template) => {

    switch (template.toLowerCase()) {
        case 'component':
        case 'theme':
        default:
            return template.toLowerCase();
    }
};

export default getTypeName;
