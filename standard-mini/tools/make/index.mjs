import path from 'path';
import colors from 'colors';
import make from './make.mjs';
import inquirer from 'inquirer';
import abort from './utils/abort.mjs';
import nameIsValid from './utils/nameIsValid.mjs';
import getSubFolders from './utils/getSubFolders.mjs';
import {
    convertToDashCase,
    convertLowerCamelCase,
    convertToSnakeCase,
    convertToScreamingSnakeCase
} from './utils/convertCase.mjs';
import getTemplateSettings from './utils/getTemplateSettings.mjs';
import getTypeName from './utils/getTypeName.mjs';

// --------------------------------------------------------------
// TOOLING CONSTS
// --------------------------------------------------------------

export const TEMPLATES_DIR = 'tools/make/templates';
export const TARGET_DIR = './src/';

export const DEFAULT_SETTINGS = {
    destination: null, // Must be generated or received from settings file
    prompt_subfolder: false,
    new_folder: true,
};

// --------------------------------------------------------------
// Functions
// --------------------------------------------------------------

async function run() {

    // Read templates and have user select one
    const templates = await getSubFolders(TEMPLATES_DIR);

    // Prompt for template
    const { template } = await inquirer.prompt([{
        type: 'list',
        name: 'template',
        message: 'Choose template',
        choices: templates
    }]);

    let templateSettings = await getTemplateSettings(template);

    if(templateSettings.prompt_subfolder) {

        const subFolders = await getSubFolders(templateSettings.destination);

        // Prompt for template
        const { subFolder } = await inquirer.prompt([{
            type: 'list',
            name: 'subFolder',
            message: 'Choose directory',
            choices: subFolders
        }]);

        templateSettings.destination = path.resolve(templateSettings.destination, subFolder);
    }

    // Get the type name from template
    const type = getTypeName(template);

    // Prompt for a name
    const { name } = await inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: `Name the ${ type }`,
    }]);

    // Must be valid!
    if (!name || !nameIsValid(name)) {
        abort(`The given name "${ colors.green(name) }" is invalid.`);
    }

    // Create some name versions
    const nameVariants = {
        upperCamelCase: name,
        lowerCamelCase: convertLowerCamelCase(name),
        dashedCase: convertToDashCase(name),
        snakeCase: convertToSnakeCase(name),
        screamingSnakeCase: convertToScreamingSnakeCase(name),
    };

    // Make the component!
    await make(name, template, templateSettings, nameVariants);

    return name;
}

run();
