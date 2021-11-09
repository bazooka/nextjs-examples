import Promise from 'bluebird';
global.Promise = Promise;
import path from 'path';
import recursive from 'recursive-readdir';
import { TEMPLATES_DIR } from './index.mjs';

import abort from './utils/abort.mjs';
import makeTemplate from './utils/makeTemplate.mjs';

async function getTemplate(type, data, settings) {
    const templatePath = path.resolve(TEMPLATES_DIR, type);
    const files = await recursive(templatePath);

    return files
        .filter(file => file.indexOf('.template') !== -1)
        .map(file => {

            let filename = file.replace(/\[%\s*(.+?)\s*%]/g, (match, group) => {
                return getTemplateData(data, group);
            });

            filename = filename.replace(templatePath + '/', '');
            filename = filename.replace('.template', '');
            filename = filename.replace(/_/g, '.');

            return {
                source: file,
                target: (name, dir) => (
                    settings.new_folder ?
                        path.resolve(dir, name, filename) :
                        path.resolve(dir, filename)
                )
            };
        });
}

export function getTemplateData(data, key) {
    if(key.indexOf('.') !== -1) {
        let parts = key.split('.');
        let part = parts.shift();
        let dataPart = data[part];

        while(parts.length) {
            part = parts.shift();
            dataPart = dataPart[part];
        }

        return dataPart;
    }

    return data[key];
}

/**
 * Start the build script.
 */
async function make(name, templateType, templateSettings, nameVariants) {

    if(name && templateType) {
        const templateData = {
            name: {
                toString: () => name,
                toUpperCamelCase: nameVariants.upperCamelCase,
                toLowerCamelCase: nameVariants.lowerCamelCase,
                toDashedCase: nameVariants.dashedCase,
                toSnakeCase: nameVariants.snakeCase,
                toScreamingSnakeCase: nameVariants.screamingSnakeCase,
            },
            cssClass: nameVariants.lowerCamelCase,
            dashedName: nameVariants.dashedCase
        };

        const templateFiles = await getTemplate(templateType, templateData, templateSettings);

        return await makeTemplate(
            name,
            templateSettings,
            templateFiles,
            templateData
        );

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
