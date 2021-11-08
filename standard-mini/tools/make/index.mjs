import inquirer from 'inquirer';
import colors from 'colors';
import make from './make.mjs';
import abort from './utils/abort.mjs';
import nameIsValid from './utils/nameIsValid.mjs';
import convertToDashCase from './utils/convertToDashCase.mjs';
import getAvailableTemplates from './utils/getAvailableTemplates.mjs';
import getTypeName from './utils/getTypeName.mjs';

const TARGET_DIR = './src/';

// --------------------------------------------------------------
// Functions
// --------------------------------------------------------------

async function run() {

    // Read templates and have user select one
    const templates = await getAvailableTemplates();

    // Prompt for template
    const { template } = await inquirer.prompt([{
        type: 'list',
        name: 'template',
        message: 'Choose template',
        choices: templates
    }]);

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
        abort(`The given name (${ colors.green(name) }) is invalid.`);
    }

    // Create some name versions
    const dashedName = convertToDashCase(name);

    // Target dir
    // TODO: Handle pluralisation of 'type' better
    const targetDir = `${ TARGET_DIR }${ type }s/`

    // Make the component!
    await make(name, template, targetDir, dashedName);

    return name;
}

run();
