import Promise from 'bluebird';
global.Promise = Promise;
import fs from 'fs-extra';
import colors from 'colors';

const FOLDER = '[folder]';

/**
 * Create new component.
 *
 * @param {String} name Name of component
 * @param {String} dir Target directory
 * @param {Object} template Template to use
 */
function makeTemplate(name, dir, template, templateData) {
    ensureNotExist(dir + name, name)
        .tap(console.log)
        .then(() => fs.mkdirp(dir + name))
        .then(() => template)
        .map(({ source, target }) => source === FOLDER ?
            createFolder(target(name, dir)) :
            writeTemplateFile(source, target(name, dir), templateData)
        )
        .then(() => console.log(`All done.`))
        .catch(console.error)
}

/**
 * Ensure given directory does not exist.
 *
 * @param {String} dir
 * @returns {Promise}
 */
function ensureNotExist(dir, name) {
    return new Promise((resolve, reject) => {
        fs.pathExists(dir)
            .catch(e => e.code !== 'ENOENT')
            .then(exists => !exists ? 
                resolve(`Creating component ${ colors.green.inverse(' ' + name + ' ') }`) : 
                reject('Error, Already exists'))
            .catch(console.error)
    });
}

/**
 * Load a template and inject data.
 * 
 * @param {String} source The template file
 * @param {Object} data Any data to be injected into template
 * @returns {Promise}
 */
function getTemplateFile(source, data) {
    return fs.readFile(source, 'utf8')
        .then(template => template.replace(/\<%\s*(.+?)\s*%>/g, (match, group) => {
            return data[group];
        }))
        .catch(e => console.log('[getTemplateFile]', e));
}

/**
 * Fetch a template and write it to given target path.
 * 
 * @param {String} source
 * @param {String} target
 * @param {Object} data
 * @returns {Promise}
 */
function writeTemplateFile(source, target, data) {
    return getTemplateFile(source, data)
        .then(content => fs.outputFile(target, content))
        .tap(() => console.log('    Created file'.grey, target.green))
        .catch(e => console.log(`Error writing template to (${ target })`, e))
}

/**
 * Create given folder.
 * 
 * @param {String} target
 */
function createFolder(target) {
    return fs.mkdirp(target)
        .tap(() => console.log('    Created directory'.grey, target.green))
        .catch(e => console.log(`Error creating directory (${ target })`, e))
}

export default makeTemplate
