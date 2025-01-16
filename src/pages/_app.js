import React from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../styles/global.scss';

const Layout = dynamic(() => import('@components/Layout'));
const ErrorBoundary = dynamic(() => import('@components/errorBoundary'));

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
