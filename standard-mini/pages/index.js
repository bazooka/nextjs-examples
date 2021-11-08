import React from 'react';
import Head from 'next/head';

import App from '~/containers/App';

export default function Home() {
    return (
        <div className="container">
            <Head>
                <title>next-app</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <App>
                
            </App>
        </div>
    );
}
