import Promise from 'bluebird';
global.Promise = Promise;
import fs from 'fs-extra';
import path from 'path';

async function getSubFolders(dir) {
    const full_path = path.resolve(dir);
    const exists = await fs.pathExists(full_path);

    if(!exists) {
        return [];
    }

    const templates = await fs.readdir(full_path);
    return templates;
}

export default getSubFolders;
