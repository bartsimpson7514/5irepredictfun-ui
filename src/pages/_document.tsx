import React from "react";
import Document, {
    DocumentContext,
    Html,
    Head,
    Main,
    NextScript,
} from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);

        return initialProps;
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta charSet="UTF-8" />
                    <meta
                        name="keywords"
                        content="5irepredict, fun, 5ire, prediction"
                    />
                    <meta name="author" content="5irepredict.fun team" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    />
                    <meta name="description" content="5ire" />

                    <link rel="icon" href="favicons/favicon.ico" />
                    <link rel="manifest" href="/site.webmanifest" />
                    <link rel="preload" as="font" />
                    <link
                        rel="mask-icon"
                        href="favicons/safari-pinned-tab.svg"
                        color="#5bbad5"
                    />

                    <title>5irepredict.fun</title>
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
