import inquirer from 'inquirer';

function promptConsent(message) {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'consent',
            message: message,
            choices: ['yes', 'no'],
            default: 'yes'
        }
    ])
        .catch(console.error);
}

export default promptConsent;
