import Promise from 'bluebird';
global.Promise = Promise;
import fs from 'fs-extra';
import path from 'path';
import { TARGET_DIR, TEMPLATES_DIR, DEFAULT_SETTINGS } from '../index.mjs';
import pluralize from './pluralize.mjs';

async function readTemplateSettingsFile(type, defaultSettings) {
    try {
        const filePath = path.resolve(TEMPLATES_DIR, type, '.settings');
        const exists = await fs.pathExists(filePath);

        if(!exists) {
            return defaultSettings;
        }

        const settings = await fs.readJSON(filePath);

        if(settings.destination) {
            settings.destination = path.resolve(settings.destination);
        }

        return {
            ...defaultSettings,
            ...settings
        };

    } catch(e) {
        return defaultSettings;
    }
}

async function getTemplateSettings(type) {

    const defaultSettings = {
        ...DEFAULT_SETTINGS,
        destination: path.resolve(TARGET_DIR, pluralize(type))
    };

    return readTemplateSettingsFile(type, defaultSettings);
}

export default getTemplateSettings;
