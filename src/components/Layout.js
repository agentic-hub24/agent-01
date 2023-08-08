import { useRouter } from 'next/router';
import FooterSection from '@components/FooterSection';
import HeaderSection from '@components/HeaderSection';
import PreviewBanner from '@components/PreviewBanner';
import CustomHead from '@components/customHead';

export default function Layout({
  children,
  headerNavigationData,
  footerNavigationData,
  seoMetadata,
  world
}) {
  const router = useRouter();
  const footerPrimaryNav = footerNavigationData?.items?.find(
    nav => nav?.metadata?.tags[0]?.sys?.id === 'kohlerLatam'
  )?.fields?.primaryNav;
  const headerNav = headerNavigationData?.items?.find(
    nav => nav?.fields?.internalTitle === 'Latam - Header'
  )?.fields;
  const logo = headerNav?.logo?.fields?.mediaItem?.fields?.asset?.fields;
  const copyRightText = footerNavigationData?.items?.find(
    nav => nav?.metadata?.tags[0]?.sys?.id === 'kohlerLatam'
  )?.fields?.copyright;

  return (
    <>
      <CustomHead seoMetaData={seoMetadata} />
      {router?.isPreview && <PreviewBanner />}
      <HeaderSection navData={headerNav} logo={logo} world={world} />
      <main>{children}</main>
      <FooterSection navData={footerPrimaryNav} copyRightText={copyRightText} />
    </>
  );
}
