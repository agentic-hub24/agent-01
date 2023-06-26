import React, { memo } from 'react';
import Section from '@components/section';

function Landing({ pageData }) {
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

export default memo(Landing);
