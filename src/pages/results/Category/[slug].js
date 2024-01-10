import contentfulClient, {
  contentfulPreviewClient
} from '@services/contenful/client';
import { getProductListing } from '@services/productListingAPI/client';
import PropTypes from 'prop-types';
import SearchPage from '@components/Search';
import { removeQuotesFromString } from '@utils/footerUtils';

export default function ResultPage({
  productListingData,
  requestBody,
  params,
  pageType,
  locale
}) {
  return (
    <SearchPage
      productListingData={productListingData}
      requestBody={requestBody}
      params={params}
      pageType={pageType}
      locale={locale}
    />
  );
}

ResultPage.propTypes = {
  productListingData: PropTypes.object,
  requestBody: PropTypes.object,
  params: PropTypes.object,
  pageType: PropTypes.string,
  locale: PropTypes.string
};

ResultPage.defaultProps = {
  productListingData: {},
  requestBody: {},
  params: {},
  pageType: '',
  locale: ''
};

export async function getServerSideProps(context) {
  const {
    preview,
    query,
    params: { slug },
    locale
  } = context;
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
    RegionProductCategoryLocal: slug.replace(/\+/g, ' '),
    lang: languageAPI
  };
  const productListingData = await getProductListing(requestBody);
  // PLP API --> end

  return {
    props: {
      headerNavigationData,
      footerNavigationData,
      world,
      productListingData,
      requestBody,
      pageType,
      params: { slug },
      locale
    }
  };
}
