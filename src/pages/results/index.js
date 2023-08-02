import { useEffect } from 'react';
import { useRouter } from 'next/router';
import contentfulClient, {
  contentfulPreviewClient
} from '@services/contenful/client';
import { getProductListing } from '@services/productListingAPI/client';
import SearchPage from '@components/Search';
import SearchNotFound from '@components/Search/SearchNotFound';
import SearchSuggestion from '@components/Search/SearchSuggestion';
import Loader from '@components/loader';
import { removeQuotesFromString } from '@utils/footerUtils';

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
        `/product-detail/${productListingData?.response?.searchResults?.PDP}?skuid=K-${productListingData?.response?.searchResults?.suggestions}`
      );
      // return null;
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

export async function getServerSideProps(context) {
  const { preview, query, locale } = context;
  const lc = ['default', 'es'].includes(locale) ? 'es-419' : 'en-US';
  const languageAPI = ['default', 'es'].includes(locale) ? 'es' : 'en';
  const searchValue = removeQuotesFromString(query?.search);
  const currentPage = removeQuotesFromString(query?.currentPage);
  const pageType = query?.type ? query?.type : '';
  const client = preview ? contentfulPreviewClient : contentfulClient;
  const query1 = await client.getEntries({
    content_type: 'latamLandingPage',
    'fields.slug': '',
    'metadata.tags.sys.id[in]': 'kohlerLatam',
    include: 7,
    locale: lc
  });
  const query2 = client.getEntries({
    content_type: 'header',
    'metadata.tags.sys.id[in]': 'kohlerLatam',
    include: 7,
    locale: lc
  });
  const query3 = client.getEntries({
    content_type: 'footer',
    'metadata.tags.sys.id[in]': 'kohlerLatam',
    include: 7,
    locale: lc
  });

  const world = await client.getEntries({
    content_type: 'worldwideMenu',
    include: 7,
    locale: lc
  });

  const results = await Promise.all([query1, query2, query3]);

  const headerNavigationData = results[1];
  const footerNavigationData = results[2];

  //PLP API CALL --> Start
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
