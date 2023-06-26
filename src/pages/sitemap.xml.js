import contentfulClient from '@services/contenful/client';
import { getProductListing } from '@services/productListingAPI/client';

//pages/sitemap.xml.js
function generateSiteMap(hostName, pages) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${pages
       .map(p => {
         let pageUrl = hostName;
         if (p.fields.slug !== '/') {
           pageUrl += `${p.fields.slug}`;
         }
         const updatedAt = new Date(p.sys.updatedAt)
           .toISOString()
           .substring(0, 10);

         return `
       <url>
        <loc>${pageUrl}</loc>
        <lastmod>${updatedAt}</lastmod>
        <priority>${p.fields.slug !== '/' ? '0.95' : '1'}</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ req, res }) {
  const pages = await contentfulClient.getEntries({
    content_type: '',
    'metadata.tags.sys.id[in]': ''
  });
  // We generate the XML sitemap with the locales and pages data

  //Generating dynamic pages with product sku
  const requestBody = {
    ProductATGDefaultCategory_PT: ''
  };
  const productListingData = await getProductListing(requestBody);
  const products = productListingData?.response?.value;

  const dynamicPaths = products?.map(singleProduct => {
    //generating dynamic pages similar to contentful data so that we can create xml
    return {
      fields: { slug: `/product-detail/${singleProduct.ProductProductNo}` }, // change product to specific slug
      sys: { updatedAt: new Date() }
    };
  });

  const sitemap = generateSiteMap(req.headers.host, [
    ...pages.items,
    ...dynamicPaths
  ]);

  res.setHeader('Content-Type', 'text/xml'); // we send the XML to the browser

  res.write(sitemap);

  res.end();

  return {
    props: {}
  };
}

export default SiteMap;
