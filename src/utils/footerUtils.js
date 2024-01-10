import { PRODUCT_CAROUSEL_IMAGE } from '@components/detailsComponent/helper';
import { SOCIAL_ICONS } from '@constants/FooterSocialIcons';

const getSocialIcon = label => {
  return SOCIAL_ICONS.find(icon => icon.type === label)?.library;
};

export { getSocialIcon };

export const searchLabel = {
  es: 'Buscar',
  en: 'Search'
};

export const backtoTopLabels = {
  en: 'Back to top',
  es: 'ir al incio'
};

export const storeDetailsLabel = {
  en: {
    mobile: 'Mobile:',
    emailAddress: 'Email:',
    websiteLink: 'Website:',
    storeTelephoneNumber: 'Telephone:'
  },
  es: {
    mobile: 'Celular:',
    emailAddress: 'Correo Electrónico:',
    websiteLink: 'Página Web:',
    storeTelephoneNumber: 'Teléfono:'
  }
};

export const storeLocatorOption = {
  en: {
    selectCountry: '--Select Country--',
    selectState: '--Select State--',
    selectCity: '--Select City--'
  },
  es: {
    selectCountry: '--Seleccionar País--',
    selectState: '--Seleccione Estado--',
    selectCity: '--Ciudad Selecta--'
  }
};

export function removeQuotesFromString(str) {
  return typeof str === 'string'
    ? str.replaceAll("'", '').replaceAll('"', '')
    : str;
}

export const defaultImage = (productItem, defaultSKU) => {
  const defaultImage = productItem
    .find(el => el.SKUSKUNo === defaultSKU)
    ?.links?.ItemResource?.filter(
      el => el.ResourceType === PRODUCT_CAROUSEL_IMAGE
    )[0]?.ResourceName;

  return `//kohler.scene7.com/is/image/PAWEB/Category_Template?$PDPcon$&$gradient_src=PAWEB%2Forganic-gradient&$shadow_src=PAWEB%2FBlank&$Badge1_src=PAWEB%2FBlank&$Badge4_src=PAWEB%2FBlank&$Badge3_src=PAWEB%2FBlank&$Badge2_src=PAWEB%2FBlank&$product_src=is{PAWEB%2F${defaultImage}}`;
};

export const createPDPSeoData = (
  {
    product: {
      ProductProductNo,
      ProductBrandName,
      ProductDescriptionProductShort,
      links: { ProductItem },
      ProductDefaultSKU
    }
  },
  context
) => {
  const pageData = {
    seoMetadata: {
      fields: {
        pageTitle: `KOHLER | ${ProductProductNo} | ${ProductBrandName}| ${ProductDescriptionProductShort}`,
        canonicalUrl: `${context?.req?.headers?.host}/${context?.locale}${context?.resolvedUrl}`,
        pageDescription: `${ProductDescriptionProductShort}`,
        ogTitle: `KOHLER | ${ProductProductNo} | ${ProductBrandName}| ${ProductDescriptionProductShort}`,
        ogDescription: `${ProductDescriptionProductShort}`,
        ogImage: {
          fields: {
            file: {
              url: defaultImage(ProductItem, ProductDefaultSKU)
            }
          }
        },
        ogType: 'Website',
        ogUrl: `${context?.req?.headers?.host}/${context?.locale}${context?.resolvedUrl}`,
        keywords: `${ProductProductNo} | ${ProductBrandName} | KOHLER`
      }
    }
  };
  return pageData;
};

export const getSEOData = (slug, seoMetadata) => {
  const data = seoMetadata?.items?.find(elem =>
    elem?.fields?.canonicalUrl?.includes(slug)
  );

  const pageData = {
    seoMetadata: {
      fields: {
        ...data?.fields
      }
    }
  };
  return pageData;
};
