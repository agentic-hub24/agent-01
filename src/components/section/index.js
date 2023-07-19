import React from 'react';
import CarouselComponent from '@components/Carousel';
import Cta from '@components/Cta';
import HomeSection from '@components/HomeSection';
import MediaItem from '@components/MediaItem/MediaItem';
import SideBySideContent from '@components/SideBySideContent';
import StoreListing from '@components/StoreListing';
import StoreListingLocator from '@components/StoreListingLocator';
import TextHeadingImageContentSection from '@components/TextHeadingImageContent';
import ArticleContent from '@components/articleContent';
import EmbededScript from '@components/embededScript';
import TextContent from '@components/textContent';

const Section = ({ fields, sys, position, pageHeading }) => {
  const sectionType = sys?.contentType?.sys?.id;
  const page = fields?.internalTitle;

  if (sectionType === 'articleContent') {
    return (
      <ArticleContent
        heading={
          pageHeading || fields?.heading?.content?.[0]?.content?.[0].value
        }
        fields={fields}
      />
    );
  } else if (sectionType === 'locator') {
    // ToDo create a separate component for below work same as above ArticleContent
    return (
      <StoreListing
        pageHeading={
          pageHeading || fields?.heading?.content?.[0]?.content?.[0].value
        }
        fields={fields}
      />
    );
  } else if (sectionType === 'form') {
    // ToDo create a separate component for below work same as above ArticleContent
    return (
      <StoreListingLocator
        pageHeading={
          pageHeading || fields?.heading?.content?.[0]?.content?.[0].value
        }
        fields={fields}
      />
    );
  } else if (sectionType === 'carousel') {
    //Managing carousel component for homepage and about us page.
    return <CarouselComponent carouselItem={fields?.carouselItem} />;
  } else if (
    sectionType === 'textContentSection' ||
    sectionType === 'richtext'
  ) {
    return (
      <TextContent heading={pageHeading} content={fields?.richText?.content} />
    );
  } else if (sectionType === 'embed') {
    return <EmbededScript fields={fields} pageHeading={pageHeading} />;
  } else if (sectionType === 'cta') {
    return <Cta fields={fields} />;
  } else if (
    sectionType === 'imageContentSection' ||
    sectionType === 'mediaItem'
  ) {
    return (
      <MediaItem assets={fields?.mediaItem || [{ fields }]} height='550px' /> //formatting fields if media item is not present
    );
  } else if (sectionType === 'textHeadingImageContentSection') {
    return <TextHeadingImageContentSection fields={fields} />;
  } else if (sectionType === 'sideBySideContentBlock') {
    return <SideBySideContent fields={fields} />;
  }
  // render multiple type of sections
  return <HomeSection homePageData={fields} />;
};

export default Section;
