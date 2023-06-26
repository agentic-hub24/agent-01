import contentfulClient, {
  contentfulPreviewClient
} from '@services/contenful/client';
import { getProductListing } from '@services/productListingAPI/client';
import ProductListing from '@components/ProductListing';

export default function ProductList({
  productListingData,
  requestBody,
  params,
  pageData
}) {
  // let arr = [];
  // // Add product to local storage
  // const typeCheck = item => {
  //   const localStorageCheck =
  //     JSON.parse(localStorage.getItem('theArray')) || [];
  //   if (localStorageCheck !== null && localStorageCheck.length > 0) {
  //     return (
  //       localStorageCheck.find(function (el) {
  //         return (
  //           el.ProductATGDefaultCategory_PT ===
  //           item.ProductATGDefaultCategory_PT
  //         );
  //       }) !== undefined
  //     );
  //   } else {
  //     return true;
  //   }
  // };
  // const addProductForCompare = (e, item) => {
  //   e.preventDefault();
  //   console.log(':::', typeCheck(item));
  //   console.log('arr length ', arr.length);
  //   if (arr.length < 3) {
  //     if (typeCheck(item)) {
  //       arr.push(item);
  //       localStorage.setItem('theArray', JSON.stringify(arr));
  //       window.dispatchEvent(new Event('storage'));
  //     } else {
  //       alert(
  //         'You can only compare products from the same category. Adding this product will clear your current comparison.'
  //       );
  //     }
  //   } else {
  //     alert(
  //       'Only three comparison products are allowed. Please remove one in order to allow adding this new compare to the list.'
  //     );
  //   }
  // };

  // // update local storage
  // const removeFromCompare = (e, id) => {
  //   e.preventDefault();
  //   console.log(id);
  //   const localStorageCheck =
  //     JSON.parse(localStorage.getItem('theArray')) || [];
  //   if (localStorageCheck !== null) {
  //     const filteredArr = localStorageCheck.filter(function (el) {
  //       return el.ProductProductNo !== id;
  //     });
  //     arr = filteredArr;
  //     localStorage.setItem('theArray', JSON.stringify(arr));
  //     console.log('arr length after rem', arr.length, filteredArr.length);
  //   }
  //   window.dispatchEvent(new Event('storage'));
  // };

  return (
    <ProductListing
      productListingData={productListingData}
      requestBody={requestBody}
      params={params}
      // addProductForCompare={addProductForCompare}
      // removeFromCompare={removeFromCompare}
      pageData={pageData}
    />
  );
}

export async function getServerSideProps(context) {
  const {
    params: { slug, sub_slug },
    preview,
    locale
  } = context;

  const client = preview ? contentfulPreviewClient : contentfulClient;
  const lc = ['default', 'es'].includes(locale) ? 'es-419' : 'en-US';
  const query1 = await client.getEntries({
    content_type: 'latamLandingPage',
    'fields.slug[match]': `/browse/${slug}/${sub_slug}`,
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

  const res = results[0];
  const headerNavigationData = results[1];
  const footerNavigationData = results[2];

  const pageData = res?.items[0]?.fields;
  const seoMetaData = res?.items[0]?.fields?.seoMetadata;

  //PLP API CALL --> Start
  const requestBody = {
    ProductATGDefaultCategory_PT: sub_slug.replace(/\+/g, ' ')
  };
  const productListingData = await getProductListing(requestBody);
  // PLP API --> end
  if (!pageData) {
    return {
      notFound: true
    };
  }
  return {
    props: {
      headerNavigationData,
      footerNavigationData,
      pageData,
      world,
      productListingData,
      requestBody,
      params: { slug, sub_slug },
      seoMetaData
    }
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every specified seconds
    //revalidate: process.env.CONTENT_REVALIDATION_TIME ?? 10
  };
}
