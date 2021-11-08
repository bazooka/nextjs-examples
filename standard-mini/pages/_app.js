import React from 'react';

import '../src/styles/globals.scss';

function CoreApp({ Component, pageProps }) {
    return (
        <Component { ...pageProps } />
    );
}

export default CoreApp;
