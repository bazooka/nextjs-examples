import Promise from 'bluebird';
global.Promise = Promise;
import path from 'path';
import recursive from 'recursive-readdir';

import abort from './utils/abort.mjs';
import makeTemplate from './utils/makeTemplate.mjs';

async function getTemplate(type, data) {
    const templatePath = path.resolve('tools/make/templates/' + type);
    const files = await recursive(templatePath);
    
    return files
        .filter(file => file.indexOf('.template') !== -1)
        .map(file => {

            let filename = file.replace(/\[%\s*(.+?)\s*%]/g, (match, group) => {
                return data[group];
            });

            filename = filename.replace(templatePath + '/', '');
            filename = filename.replace('.template', '');
            filename = filename.replace(/_/g, '.');

            return {
                source: file,
                target: (name, dir) => (`${ dir }${ name }/${ filename }`)
            }
        });
}

/**
 * Start the build script.
 */
function make(name, templateType, targetDir, dashedName='') {
    if(name && templateType) {
        
        const templateData = {
            name: name,
            cssClass: name.charAt(0).toLowerCase() + name.substr(1),
            dashedName
        };

        const template = getTemplate(templateType, templateData);
        return makeTemplate(name, targetDir, template, templateData);
    } else {
        abort('Missing arguments. Did you provide a name?');
    }
}

// --------------------------------------------------------------
// 
// Start
// 
// --------------------------------------------------------------

export default make;
