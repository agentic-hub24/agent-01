import React, { useState } from 'react';
import FooterAccordion from '@components/FooterAccordion';
import NavItems from '@components/NavItems';

const FooterSection = ({ navData = [], copyRightText = '' }) => {
  const [openKey, setOpenKey] = useState();

  const handleToggle = key => {
    setOpenKey(openKey !== key ? key : null);
  };

  return navData ? (
    <>
      <div className={'hidden min-[821px]:block bg-[#232323]'}>
        <section className='w-full sm:h-[345px]'>
          <div className='flex-none justify-evenly pt-5 sm:flex'>
            {navData?.map(item => (
              <div className='first:pt-6 sm:first:pt-0' key={item?.sys?.id}>
                <div className="my-3 text-footertext font-['Helvetica'] text-[14px] uppercase cursor-default">
                  {item?.fields?.heading}
                </div>
                {item?.fields?.navItems.map((navItem, key) => (
                  <NavItems
                    key={key}
                    navItem={navItem}
                    classNames="text-footermenutext hover:text-white cursor-pointer my-2 font-['Helvetica'] text-[12px]"
                    linkClass='flex lg:p-[4px] w-full text-footermenutext hover:text-white cursor-pointer'
                  />
                ))}
              </div>
            ))}
          </div>
        </section>
        <div className='flex flex-1 justify-center py-6 border-t-[1px] border-[#444]'>
          <a
            className='text-primary '
            target='_blank'
            rel='noreferrer noopener'
            href='https://kohler.com/'
          >
            <span className="font-['Helvetica'] text-[#999999] text-[12px] ">
              {copyRightText}
            </span>
          </a>
        </div>
      </div>
      <div className={'hidden max-[820px]:block bg-[#232323]'}>
        <section className='w-full'>
          <div className='flex-none justify-evenly'>
            {navData?.map((item, index) => (
              <FooterAccordion
                key={item?.sys?.id || index}
                item={item}
                isActive={true}
                header={item?.fields?.heading}
                handleToggle={handleToggle}
                open={openKey === item?.fields?.heading}
              >
                {item?.fields?.navItems.map((navItem, key) => (
                  <React.Fragment key={key}>
                    <NavItems
                      navItem={navItem}
                      data-te-collapse-item
                      id='collapseExample'
                      stylePro='15px 30px'
                      classNames="text-footermenutext hover:text-white cursor-pointer my-2 font-['Helvetica'] text-[14px]"
                      linkClass='flex lg:p-[4px] w-full text-footermenutext'
                    />
                    <div className='border-b-[1px] border-[#666]' />
                  </React.Fragment>
                ))}
              </FooterAccordion>
            ))}
          </div>
        </section>

        <div className='flex flex-1 justify-center py-6 border-[#444]'>
          <a
            className='text-primary '
            target='_blank'
            rel='noreferrer noopener'
            href='https://kohler.com/'
          >
            <span className="font-['Helvetica'] text-[#999999] text-[12px] ">
              {copyRightText}
            </span>
          </a>
        </div>
      </div>
    </>
  ) : null;
};

export default FooterSection;
