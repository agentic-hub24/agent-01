import React from 'react';
import PropTypes from 'prop-types';
import Layout from '@components/Layout';
import ErrorBoundary from '@components/errorBoundary';
import 'bootstrap-icons/font/bootstrap-icons.css'
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

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
};

export default MyApp;
