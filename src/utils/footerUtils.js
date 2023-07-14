import { SOCIAL_ICONS } from '@constants/FooterSocialIcons';

const getSocialIcon = label => {
  return SOCIAL_ICONS.find(icon => icon.type === label)?.library;
};

export { getSocialIcon };

export const searchLabel = {
  es: 'Buscar',
  en: 'Search'
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
  return str.replaceAll("'", '').replaceAll('"', '');
}
