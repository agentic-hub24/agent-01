import contentfulClient, {
  contentfulPreviewClient
} from '@services/contenful/client';
import { getProductListing } from '@services/productListingAPI/client';
import PropTypes from 'prop-types';
import { fetchContentfulCommonEntries } from '@components/CommonSection';
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
  const client = preview ? contentfulPreviewClient : contentfulClient;
  const languageAPI = ['default', 'es'].includes(locale) ? 'es' : 'en';
  const searchValue = removeQuotesFromString(query?.search);
  const currentPage = removeQuotesFromString(query?.currentPage);
  const pageType = query?.type ? query?.type : '';

  const { footerNavigationData, headerNavigationData, world } =
    await fetchContentfulCommonEntries(lc, client);

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
