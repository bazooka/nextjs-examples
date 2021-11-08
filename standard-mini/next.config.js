const path = require('path');
const withImages = require('next-images');

module.exports = withImages(
    {
        sassOptions: {
            includePaths: [
                path.join(__dirname, 'src/styles'),
            ],
        },
        env: {
        },
        i18n: {
            locales: ['en', 'sv'],
            defaultLocale: 'sv',
            localeDetection: false
        },
    }
);
