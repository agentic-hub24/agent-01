import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en-US' className='light'>
        <Head>
          {/* one trust cookie script starts */}
          <script
            type='text/javascript'
            src='https://cdn.cookielaw.org/consent/29e9d447-96cb-4b2d-87be-2141feb07d99/OtAutoBlock.js'
            async
          />

          <script
            src='https://cdn.cookielaw.org/scripttemplates/otSDKStub.js'
            type='text/javascript'
            // charset='UTF-8'
            data-domain-script='29e9d447-96cb-4b2d-87be-2141feb07d99'
            async
          />
          {/* one trust cookie script ends  */}
          <script
            type='text/javascript'
            async
            src={process.env.NEXT_PUBLIC_NEW_RELIC}
          ></script>
          {/* Adobe Analytics script start */}
          <script src={process.env.ADOBEDTM_SCRIPT} async></script>
          {/* Adobe Analytics script end */}
          <link rel='apple-touch-icon' href='/fevicon.ico' />
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
