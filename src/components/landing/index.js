import React, { memo } from 'react';
import PressRelease from '@components/pressRelease';
import Section from '@components/section';

function Landing({ pageData }) {
  if (pageData?.internalTitle.trim() === 'Latam - Press Room') {
    return <PressRelease pageData={pageData} />;
  } else if (pageData?.internalTitle?.includes('Press Room Article Page')) {
    return (
      <>
        {pageData?.pageSections?.map((section, index) => (
          <Section
            key={section.sys.id}
            fields={section.fields}
            sys={section.sys}
            position={index}
          />
        ))}
      </>
    );
  } else {
    return (
      <>
        {pageData?.pageSections?.map((section, index) => (
          <Section
            key={section.sys.id}
            fields={section.fields}
            sys={section.sys}
            position={index}
            pageHeading={pageData.pageHeading}
          />
        ))}
      </>
    );
  }
}

export default memo(Landing);
