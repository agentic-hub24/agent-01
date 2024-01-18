import { useEffect } from 'react';
import { useRouter } from 'next/router';
import contentfulClient, {
  contentfulPreviewClient
} from '@services/contenful/client';
import { getProductDetails } from '@services/productListingAPI/client';
import PropTypes from 'prop-types';
import { fetchContentfulCommonEntries } from '@components/CommonSection';
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

ProductDetailMain.propTypes = {
  productDetailsData: PropTypes.object,
  productNo: PropTypes.string
};

export async function getServerSideProps(context) {
  const {
    params: { productNo },
    locale,
    preview
  } = context;
  const lc = ['default', 'es'].includes(locale) ? 'es-419' : 'en-US';
  const languageAPI = ['default', 'es'].includes(locale) ? 'es-mx' : 'en';
  const client = preview ? contentfulPreviewClient : contentfulClient;

  const { footerNavigationData, headerNavigationData, world } =
    await fetchContentfulCommonEntries(lc, client);

  const productDetailsData = await getProductDetails(languageAPI, productNo);
  // seo meta data
  const pageData = createPDPSeoData(productDetailsData?.data, context);

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
