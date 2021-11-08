import Promise from 'bluebird';
global.Promise = Promise;
import fs from 'fs-extra';
import path from 'path';

async function getAvailableTemplates() {
    const templates = await fs.readdir(path.resolve('tools/make/templates'));
    return templates;
}

export default getAvailableTemplates;
