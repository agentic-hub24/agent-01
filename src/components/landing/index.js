import React, { memo } from 'react';
import PropTypes from 'prop-types';
import PressRelease from '@components/pressRelease';
import Section from '@components/section';

function Landing({ pageData }) {
  const {internalTitle, pageSections, pageHeading } = pageData
  if (internalTitle?.trim() === 'Latam - Press Room') {
    return <PressRelease pageData={pageData} />;
  } else if (internalTitle?.includes('Press Room Article Page')) {
    return (
      <>
        {pageSections?.map((section, index) => (
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
        {pageSections?.map((section, index) => (
          <Section
            key={section.sys.id}
            fields={section.fields}
            sys={section.sys}
            position={index}
            pageHeading={pageHeading}
          />
        ))}
      </>
    );
  }
}

Landing.propTypes = {
  pageData: PropTypes.shape({
    internalTitle: PropTypes.string,
    pageSections: PropTypes.arrayOf(
      PropTypes.shape({
        sys: PropTypes.shape({
          id: PropTypes.string
        }),
        fields: PropTypes.object
      })
    ),
    pageHeading: PropTypes.string
  })
};

export default memo(Landing);
