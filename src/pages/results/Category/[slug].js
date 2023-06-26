import contentfulClient, {
  contentfulPreviewClient
} from '@services/contenful/client';
import { getProductListing } from '@services/productListingAPI/client';
import SearchPage from '@components/Search';

export default function ResultPage({
  productListingData,
  requestBody,
  params,
  pageType,
  pageData
}) {
  return (
    <SearchPage
      productListingData={productListingData}
      requestBody={requestBody}
      params={params}
      pageType={pageType}
      pageData={pageData}
    />
  );
}

export async function getServerSideProps(context) {
  const {
    preview,
    query,
    params: { slug }
  } = context;
  const searchValue = query?.search;
  const currentPage = query?.currentPage;
  const pageType = query?.type;
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
    'metadata.tags.sys.id[in]': '',
    include: 7,
    locale: ''
  });
  const query3 = client.getEntries({
    content_type: 'footer',
    'metadata.tags.sys.id[in]': '',
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

  const pageData = res?.items?.[0]?.fields;

  //PLP API CALL --> Start
  const requestBody = {
    search: searchValue,
    CurrentPage: currentPage ? currentPage : '',
    ProductATGDefaultCategory_PT: slug.replace(/\+/g, ' ')
  };
  const productListingData = await getProductListing(requestBody);
  // PLP API --> end

  return {
    props: {
      headerNavigationData,
      footerNavigationData,
      pageData,
      world,
      productListingData,
      requestBody,
      pageType,
      params: { slug }
    }
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every specified seconds
    //revalidate: process.env.CONTENT_REVALIDATION_TIME ?? 10
  };
}
