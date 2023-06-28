import { SOCIAL_ICONS } from '@constants/FooterSocialIcons';

const getSocialIcon = label => {
  return SOCIAL_ICONS.find(icon => icon.type === label)?.library;
};

export { getSocialIcon };

export const searchLabel = {
  es: 'Buscar',
  en: 'Search'
};
