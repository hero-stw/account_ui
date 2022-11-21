import Document, {Head, Html, Main, NextScript} from "next/document";
import React from "react";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap"
                        rel="stylesheet"
                    />
                    <meta
                        property="og:image"
                        content="order-me-logo.png"
                    />
                    <meta
                        name="description"
                        content="Order Me Account"
                    />
                    <meta name="keywords" content="Liam"/>
                    <link rel="icon" href="/order-me-logo.png"/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
