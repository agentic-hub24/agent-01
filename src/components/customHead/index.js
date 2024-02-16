import { memo } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

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
      {process.env.NEXT_PUBLIC_LOWER_ENV_TAG && (
        <meta name='robots' content='noindex, nofollow' />
      )}
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

CustomHead.propTypes = {
  seoMetaData: PropTypes.shape({
    fields: PropTypes.shape({
      canonicalUrl: PropTypes.string,
      pageTitle: PropTypes.string,
      ogTitle: PropTypes.string,
      pageDescription: PropTypes.string,
      ogDescription: PropTypes.string,
      ogType: PropTypes.string,
      ogUrl: PropTypes.string,
      ogImage: PropTypes.shape({
        fields: PropTypes.shape({
          file: PropTypes.shape({
            url: PropTypes.string
          })
        })
      }),
      keywords: PropTypes.string
    })
  })
};

export default memo(CustomHead);
