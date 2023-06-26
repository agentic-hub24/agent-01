import React from 'react';
import Layout from '@components/Layout';
import ErrorBoundary from '@components/errorBoundary';
import '../styles/global.scss';

const MyApp = ({ Component, pageProps }) => {
  const { headerNavigationData, footerNavigationData, world } = pageProps;

  return (
    <ErrorBoundary>
      <Layout
        headerNavigationData={headerNavigationData}
        footerNavigationData={footerNavigationData}
        seoMetadata={pageProps?.pageData?.seoMetadata}
        world={world}
      >
        <Component {...pageProps} />
      </Layout>
    </ErrorBoundary>
  );
};

export default MyApp;
