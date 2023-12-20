import { memo } from 'react';
import Head from 'next/head';

const CustomHead = ({ seoMetaData }) => {
  const {
    canonicalUrl,
    pageTitle,
    ogTitle,
    pageDescription,
    ogDescription,
    ogType,
    ogUrl,
    ogImage,
    keywords
  } = seoMetaData?.fields || {};
  return (
    <Head>
      <title>{pageTitle}</title>
      <link rel='canonical' href={canonicalUrl} />
      <meta name='description' content={pageDescription}></meta>
      <meta property='og:title' content={ogTitle} />
      <meta property='og:description' content={ogDescription} />
      <meta property='og:image' content={ogImage?.fields?.file?.url} />
      <meta property='og:type' content={ogType} />
      <meta property='og:url' content={ogUrl} />
      <meta name='keywords' content={keywords} />
      <meta charSet='utf-8' />
      <script type='text/javascript' id='oneScript'>
        {`function OptanonWrapper() { }`}
      </script>
    </Head>
  );
};

export default memo(CustomHead);
