import contentfulClient, {
  contentfulPreviewClient
} from '@services/contenful/client';
import { getProductListing } from '@services/productListingAPI/client';
import PropTypes from 'prop-types';
import { fetchContentfulCommonEntries } from '@components/CommonSection';
import ProductListing from '@components/ProductListing';
import { getSEOData } from '@utils/footerUtils';

export default function ProductList({
  productListingData,
  requestBody,
  params,
  locale
}) {
  return (
    <ProductListing
      productListingData={productListingData}
      requestBody={requestBody}
      params={params}
      locale={locale}
    />
  );
}

ProductList.propTypes = {
  productListingData: PropTypes.object.isRequired,
  requestBody: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired
};

export async function getServerSideProps(context) {
  const { params, locale, preview, query } = context;
  const languageAPI = ['default', 'es'].includes(locale) ? 'es' : 'en';
  const lc = ['default', 'es'].includes(locale) ? 'es-419' : 'en-US';
  const client = preview ? contentfulPreviewClient : contentfulClient;

  const seoMetaData = await client.getEntries({
    content_type: 'seoMetadata',
    'metadata.tags.sys.id[in]': 'kohlerLatam',
    include: 7,
    locale: lc
  });

  const { footerNavigationData, headerNavigationData, world } =
    await fetchContentfulCommonEntries(lc, client);

  //PLP API CALL --> Start
  const requestBody = {
    search: '',
    orderby: '',
    RegionProductCategoryLocal: params.sub_slug.replace(/\+/g, ' '),
    lang: languageAPI,
    ...(query?.filterBy && { [query?.filterBy]: [query?.value] })
  };
  const productListingData = await getProductListing(requestBody);
  // PLP API --> end

  const pageData = getSEOData(params.sub_slug, seoMetaData);
  return {
    props: {
      footerNavigationData,
      headerNavigationData,
      world,
      pageData,
      productListingData,
      params,
      locale,
      requestBody
    }
  };
}
