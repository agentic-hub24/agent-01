import { useEffect } from 'react';
import { useRouter } from 'next/router';
import contentfulClient, {
  contentfulPreviewClient
} from '@services/contenful/client';
import { getProductDetails } from '@services/productListingAPI/client';
import DetailsComponent from '@components/detailsComponent';
import { createPDPSeoData } from '@utils/footerUtils';

export default function ProductDetailMain({ productDetailsData, productNo }) {
  const router = useRouter();

  useEffect(() => {
    if (router?.query?.skuid) {
      const queryParams = {
        skuid: router?.query?.skuid
      }; // Replace with your desired dynamic query parameters

      // setSkuID(queryParams.skuid);
      // Create the URL with the dynamic query parameters
      const url = {
        pathname: `/product-detail/${productNo}`,
        query: queryParams
      };

      // Update the URL
      router.push(url);
    } else {
      const queryParams = {
        skuid: `K-${productDetailsData?.data?.product?.ProductDefaultSKU}`
      }; // Replace with your desired dynamic query parameters

      // setSkuID(queryParams.skuid);
      // Create the URL with the dynamic query parameters
      const url = {
        pathname: `/product-detail/${productNo}`,
        query: queryParams
      };

      // Update the URL
      router.push(url);
    }
  }, []);

  return <DetailsComponent productDetailsData={productDetailsData} />;
}

export async function getServerSideProps(context) {
  const {
    params: { productNo },
    locale,
    preview
  } = context;
  const lc = ['default', 'es'].includes(locale) ? 'es-419' : 'en-US';
  const languageAPI = ['default', 'es'].includes(locale) ? 'es-mx' : 'en';
  const client = preview ? contentfulPreviewClient : contentfulClient;

  const footerNavigationData = await client.getEntries({
    content_type: 'footer',
    'metadata.tags.sys.id[in]': 'kohlerLatam',
    include: 7,
    locale: lc
  });

  const headerNavigationData = await client.getEntries({
    content_type: 'header',
    'metadata.tags.sys.id[in]': 'kohlerLatam',
    include: 7,
    locale: lc
  });
  const world = await client.getEntries({
    content_type: 'worldwideMenu',
    include: 7,
    locale: lc
  });

  const productDetailsData = await getProductDetails(languageAPI, productNo);
  // seo meta data
  const pageData = createPDPSeoData(productDetailsData?.data);

  return {
    props: {
      footerNavigationData,
      headerNavigationData,
      world,
      pageData,
      productDetailsData,
      productNo
    }
  };
}
