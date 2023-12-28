import React, { useMemo } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { INLINES, BLOCKS } from '@contentful/rich-text-types';
import PropTypes from 'prop-types';

export const RichText = ({
  text,
  urlTarget = 'New Tab',
  paragraphCustomClasses
}) => {
  const target = urlTarget === 'New Tab' ? '_blank' : '';
  const options = useMemo(
    () => ({
      renderNode: {
        [INLINES.HYPERLINK]: (node, children) => {
          return (
            <a target={target} rel='noopener noreferrer' href={node.data.uri}>
              {children}
            </a>
          );
        },
        [BLOCKS.PARAGRAPH]: (node, children) => (
          <p className={paragraphCustomClasses}>{children}</p>
        )
      },
      renderText: text => {
        return text.split('\n').reduce((children, textSegment, index) => {
          return [...children, index > 0 && <br key={index} />, textSegment];
        }, []);
      }
    }),
    [paragraphCustomClasses, target]
  );
  const renderedText = documentToReactComponents(text, options);

  return <div className='rich-text'>{renderedText}</div>;
};

RichText.propTypes = {
  text: PropTypes.object,
  urlTarget: PropTypes.oneOf(['New Tab', '']),
  paragraphCustomClasses: PropTypes.string
};
