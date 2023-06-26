import { useEffect } from 'react';
import { useRouter } from 'next/router';
import contentfulClient, {
  contentfulPreviewClient
} from '@services/contenful/client';
import { getProductListing } from '@services/productListingAPI/client';
import SearchPage from '@components/Search';
import SearchNotFound from '@components/Search/SearchNotFound';
import SearchSuggestion from '@components/Search/SearchSuggestion';

export default function ResultPage({
  productListingData,
  requestBody,
  pageType,
  pageData
}) {
  const router = useRouter();

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      productListingData?.response?.searchResults?.PDP
    ) {
      window.location = `/product-detail/${productListingData?.response?.searchResults?.PDP}`;
      // return null;
    }
  }, [productListingData]);

  {
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
        />
      ) : (
        <SearchSuggestion
          requestBody={requestBody}
          suggestion={productListingData?.response?.searchResults?.suggestions}
        ></SearchSuggestion>
      );
    } else {
      return <SearchNotFound requestBody={requestBody}></SearchNotFound>;
    }
  }
}

export async function getServerSideProps(context) {
  const { preview, query } = context;
  const searchValue = query?.search;
  const currentPage = query?.currentPage;
  const pageType = query?.type ? query?.type : '';
  const client = preview ? contentfulPreviewClient : contentfulClient;
  const query1 = await client.getEntries({
    content_type: '',
    'fields.slug[match]': ``,
    'metadata.tags.sys.id[in]': '',
    include: 7,
    locale: ''
  });
  const query2 = client.getEntries({
    content_type: 'header',
    'metadata.tags.sys.id[in]': 'kohlerLatam',
    include: 7,
    locale: ''
  });
  const query3 = client.getEntries({
    content_type: 'footer',
    'metadata.tags.sys.id[in]': 'kohlerLatam',
    include: 7,
    locale: ''
  });

  const world = await client.getEntries({
    content_type: 'worldwideMenu',
    include: 7,
    locale: ''
  });

  const results = await Promise.all([query1, query2, query3]);

  const res = results[0];
  const headerNavigationData = results[1];
  const footerNavigationData = results[2];

  const pageData = res?.items[0]?.fields;

  //PLP API CALL --> Start
  const requestBody = {
    search: searchValue,
    CurrentPage: currentPage ? currentPage : ''
  };
  const productListingData = await getProductListing(requestBody);
  //   // PLP API --> end

  return {
    props: {
      headerNavigationData,
      footerNavigationData,
      pageData,
      world,
      productListingData,
      requestBody,
      pageType
    }
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every specified seconds
    //revalidate: process.env.CONTENT_REVALIDATION_TIME ?? 10
  };
}
