import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en-US' className='light'>
        <Head>
          {/* one trust cookie script starts */}
          <script
            type='text/javascript'
            src='https://cdn.cookielaw.org/consent/0f99d1d9-de19-4f4d-b3b8-76416322c67c/OtAutoBlock.js'
            async
          />

          <script
            src='https://cdn.cookielaw.org/scripttemplates/otSDKStub.js'
            type='text/javascript'
            // charset='UTF-8'
            data-domain-script='0f99d1d9-de19-4f4d-b3b8-76416322c67c'
            async
          />
          {/* one trust cookie script ends  */}
          <script type='text/javascript' async src='/js/newrelic.js'></script>
          {/* PS meta data> */}
          <meta name='ps-key' content='1730-61731e79166c1200213fbaf9' />
          <meta name='ps-country' content='BR' />
          <meta name='ps-language' content='pt' />
          <script src='//cdn.pricespider.com/1/lib/ps-widget.js' async></script>
          {/* end of PS meta data */}
          {/* Adobe Analytics script start */}
          <script src={process.env.ADOBEDTM_SCRIPT} async></script>
          {/* Adobe Analytics script end */}
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
