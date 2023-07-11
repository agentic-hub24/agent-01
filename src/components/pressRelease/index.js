import React, { useState } from 'react';
import { RichText } from '@components/RichText';

const PressRelease = ({ pageData }) => {
  console.log('page data ', pageData);
  const { pageHeading, pageSections } = pageData;
  const ctaButtons = pageSections.filter(
    item => item?.sys?.contentType?.sys?.id === 'cta'
  );
  const textHeadingImageContentSection = pageSections.filter(
    item => item?.sys?.contentType?.sys?.id === 'textHeadingImageContentSection'
  );

  const getFormattedDate = d => {
    const date = new Date(d);
    const month = date.toLocaleString('default', { month: 'long' });
    return `${month} ${date.getDate()}, ${date.getFullYear()}`;
  };
  console.log('ctaButtons ', ctaButtons);
  return (
    <section className='px-4 lg:px-0'>
      <div className='grid grid-cols-1 w-full mx-auto max-w-screen-lg'>
        <div className='text-center py-12'>
          <h1 className='text-[32px] text-[#232323] font-[700] mb-8'>
            {pageHeading}
          </h1>
          <div className='hidden lg:block'>
            {ctaButtons?.map(
              ({ fields }) =>
                fields?.visible && (
                  <button
                    key={fields?.label}
                    className='text-[18px] text-[#fff] bg-[#232323] font-[500] py-2 px-4 rounded-md mr-4'
                  >
                    {fields?.label}
                  </button>
                )
            )}
          </div>
          <div className='block lg:hidden'>
            <select className='w-[50%] border-solid border-2 border-grey'>
              {ctaButtons?.map(
                ({ fields }) =>
                  fields?.visible && (
                    <option key={fields?.label} className='text-[12px]'>
                      {fields?.label}
                    </option>
                  )
              )}
            </select>
          </div>
        </div>
        {textHeadingImageContentSection.map(({ fields }, index) => (
          <div
            key={index}
            className={`${
              index === 0
                ? 'bg-[#e5e5e5] p-4 mb-8'
                : 'border-solid border-b-2 border-grey mb-10'
            }`}
          >
            {fields?.date && <span>{getFormattedDate(fields?.date)}</span>}
            <RichText
              text={fields?.textContent}
              paragraphCustomClasses='text-[14px] text-black'
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PressRelease;
