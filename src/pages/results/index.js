import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import contentfulClient, {
  contentfulPreviewClient
} from '@services/contenful/client';
import { getProductListing } from '@services/productListingAPI/client';
import PropTypes from 'prop-types';
import { removeQuotesFromString } from '@utils/footerUtils';

const { fetchContentfulCommonEntries } = dynamic(() =>
  import('@components/CommonSection')
);
const SearchPage = dynamic(() => import('@components/Search'));
const SearchNotFound = dynamic(() =>
  import('@components/Search/SearchNotFound')
);
const SearchSuggestion = dynamic(() =>
  import('@components/Search/SearchSuggestion')
);
const Loader = dynamic(() => import('@components/loader'));

export default function ResultPage({
  productListingData,
  requestBody,
  pageType,
  pageData,
  locale
}) {
  const router = useRouter();

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      productListingData?.response?.searchResults?.PDP
    ) {
      router.push(
        `/product-detail/${productListingData?.response?.searchResults?.PDP}?skuid=${productListingData?.response?.searchResults?.suggestions}`
      );
    }
  }, [productListingData]);

  if (router.isFallback) {
    return <Loader loading={router.isFallback} />;
  }

  if (
    productListingData?.response['@odata.count'] > 0 ||
    productListingData?.response?.searchResults?.suggestions
  ) {
    return !productListingData?.response?.searchResults?.suggestions ? (
      <SearchPage
        productListingData={productListingData}
        requestBody={requestBody}
        pageType={pageType}
        pageData={pageData}
        locale={locale}
      />
    ) : (
      <SearchSuggestion
        requestBody={requestBody}
        suggestion={productListingData?.response?.searchResults?.suggestions}
        locale={locale}
      />
    );
  } else {
    return <SearchNotFound requestBody={requestBody} locale={locale} />;
  }
}

ResultPage.propTypes = {
  productListingData: PropTypes.object,
  requestBody: PropTypes.object,
  pageType: PropTypes.string,
  pageData: PropTypes.object,
  locale: PropTypes.string
};

ResultPage.defaultProps = {
  productListingData: {},
  requestBody: {},
  pageType: '',
  pageData: {},
  locale: ''
};

export async function getServerSideProps(context) {
  const { preview, query, locale } = context;
  const lc = ['default', 'es'].includes(locale) ? 'es-419' : 'en-US';
  const client = preview ? contentfulPreviewClient : contentfulClient;
  const languageAPI = ['default', 'es'].includes(locale) ? 'es' : 'en';

  const { footerNavigationData, headerNavigationData, world } =
    await fetchContentfulCommonEntries(lc, client);

  //PLP API CALL --> Start
  const searchValue = removeQuotesFromString(query?.search);
  const currentPage = removeQuotesFromString(query?.currentPage);
  const pageType = query?.type ? query?.type : '';
  const requestBody = {
    search: searchValue,
    CurrentPage: currentPage ? currentPage : '',
    lang: languageAPI
  };
  const productListingData = await getProductListing(requestBody);
  //   // PLP API --> end

  return {
    props: {
      headerNavigationData,
      footerNavigationData,
      world,
      productListingData,
      requestBody,
      pageType,
      locale
    }
  };
}
