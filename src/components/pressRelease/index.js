import React, { useState, memo } from 'react';
import { useRouter } from 'next/router';
import Cta from '@components/Cta';
import { RichText } from '@components/RichText';
import BackToTop from '@components/backToTop';

const PressRelease = ({ pageData }) => {
  const router = useRouter();
  const { locale = '' } = router;
  const { pageHeading, pageSections } = pageData;
  // Preparing tabs button exluding bottom help us link
  const ctaButtons = pageSections.filter(
    item =>
      item?.sys?.contentType?.sys?.id === 'cta' &&
      !item?.fields.internalTitle.includes('Help Us Improve')
  );

  // Preparing Bottom help us link
  const helpUsLink = pageSections.find(item =>
    item?.fields.internalTitle.includes('Help Us Improve')
  );

  // Filtering tabs content data
  const textHeadingImageContentSection = pageSections.filter(
    item => item?.sys?.contentType?.sys?.id === 'textHeadingImageContentSection'
  );

  // preparing default tabs data which will loaded first
  const defaultTabData = textHeadingImageContentSection.filter(item =>
    item.fields.internalTitle
      .toLowerCase()
      .includes(ctaButtons?.[0].fields?.label.toLowerCase())
  );

  const [activeButton, setActiveButton] = useState(
    ctaButtons?.[0].fields?.label
  );
  const [tabsData, setTabsData] = useState(defaultTabData);

  const getFormattedDate = d => {
    const date = new Date(d);
    const month = date.toLocaleString('default', { month: 'long' });
    return `${month} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const handleTabs = btnIntTitle => {
    setActiveButton(btnIntTitle);
    createTabData(btnIntTitle);
  };

  const handleSelect = e => {
    const selectedVal = e.target.value;
    createTabData(selectedVal);
  };

  // Preparing tab data based on button clicked
  const createTabData = btnIntTitle => {
    const data = textHeadingImageContentSection.filter(item =>
      item.fields.internalTitle
        .toLowerCase()
        .includes(btnIntTitle.toLowerCase())
    );
    setTabsData(data);
  };
  return (
    <>
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
                      className={`text-[18px] font-[500] py-2 px-4 rounded-md mr-4 ${
                        activeButton === fields?.label
                          ? 'bg-[#232323]  text-[#fff]'
                          : 'bg-[#e5e5e5] text-[#000]'
                      }`}
                      onClick={() => handleTabs(fields?.label)}
                    >
                      {fields?.label}
                    </button>
                  )
              )}
            </div>
            <div className='block lg:hidden'>
              <select
                className='w-[98%] border-solid border-2 border-grey'
                onChange={handleSelect}
              >
                {ctaButtons?.map(
                  ({ fields }) =>
                    fields?.visible && (
                      <option
                        key={fields?.label}
                        className='text-[12px]'
                        value={fields?.label}
                      >
                        {fields?.label}
                      </option>
                    )
                )}
              </select>
            </div>
          </div>
          {tabsData.map(({ fields }, index) => (
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
      <Cta fields={helpUsLink?.fields} />
      <BackToTop topHeight={0} localeProp={locale} />
    </>
  );
};

export default memo(PressRelease);
