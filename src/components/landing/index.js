import React, { memo } from 'react';
import Section from '@components/section';
import PressRelease from '@components/pressRelease';

function Landing({ pageData }) {
  if(pageData?.internalTitle.trim() === 'Latam - Press Room'){
    return <PressRelease pageData={pageData}/>
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
