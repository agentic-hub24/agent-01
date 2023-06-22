import { useRouter } from 'next/router';
import FooterSection from '@components/FooterSection';
import HeaderSection from '@components/HeaderSection';
import PreviewBanner from '@components/PreviewBanner';
import CustomHead from '@components/customHead';
import WorldWideMenu from './WorldWideMenu';

export default function Layout({
  children,
  headerNavigationData,
  footerNavigationData,
  seoMetadata,
  world
}) {
  const router = useRouter();
  const footerPrimaryNav = footerNavigationData?.items?.find(
    nav => nav?.metadata?.tags[0]?.sys?.id === 'kohlerBrazil'
  )?.fields?.primaryNav;
  const headerNav = headerNavigationData?.items?.find(
    nav => nav?.fields?.internalTitle === 'Brazil Header'
  )?.fields;
  const logo = headerNav?.logo?.fields?.mediaItem?.fields?.asset?.fields;
  const copyRightText = footerNavigationData?.items?.find(
    nav => nav?.metadata?.tags[0]?.sys?.id === 'kohlerBrazil'
  )?.fields?.copyright;

  return (
    <>
      <CustomHead seoMetaData={seoMetadata} />
      {router?.isPreview && <PreviewBanner />}
      <WorldWideMenu world={world} />
      <HeaderSection navData={headerNav} logo={logo} world={world} />
      <main>{children}</main>
      <FooterSection navData={footerPrimaryNav} copyRightText={copyRightText} />
    </>
  );
}
