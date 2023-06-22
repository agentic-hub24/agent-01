import contentfulClient, {
  contentfulPreviewClient
} from '@services/contenful/client';
import { getProductCategory } from '@services/productListingAPI/client';
import ShowAllProducts from '@components/ShowAllProducts';

export default function AllListing({ pageSlug, categoryProductData }) {
  return (
    <ShowAllProducts
      pageSlug={pageSlug}
      categoryProductData={categoryProductData}
    />
  );
}

export async function getServerSideProps(context) {
  const {
    params: { slug },
    preview
  } = context;

  const client = preview ? contentfulPreviewClient : contentfulClient;
  const query1 = await client.getEntries({
    content_type: 'brazilLandingPage',
    'fields.slug[match]': `browse/${slug}`,
    'metadata.tags.sys.id[in]': 'kohlerBrazil',
    include: 7,
    locale: 'pt-BR'
  });
  const query2 = client.getEntries({
    content_type: 'header',
    'metadata.tags.sys.id[in]': 'kohlerBrazil',
    include: 7,
    locale: 'pt-BR'
  });
  const query3 = client.getEntries({
    content_type: 'footer',
    'metadata.tags.sys.id[in]': 'kohlerBrazil',
    include: 7,
    locale: 'pt-BR'
  });
  const world = await client.getEntries({
    content_type: 'worldwideMenu',
    include: 7,
    locale: 'pt-BR'
  });

  const results = await Promise.all([query1, query2, query3]);
  const pageSlug = slug;

  const res = results[0];
  const headerNavigationData = results[1];
  const footerNavigationData = results[2];

  //   const pageData = res?.items?.[0]?.fields;

  // category API -- start
  const categoryProductData = await getProductCategory(slug);
  // categoty API -- END

  return {
    props: {
      headerNavigationData,
      footerNavigationData,
      //   pageData,
      world,
      pageSlug,
      categoryProductData
    }
  };
}
