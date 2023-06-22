import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { HiSearch, HiOutlineChevronRight } from 'react-icons/hi';
import Image from 'next/image';
import Link from 'next/link';
import cx from 'classnames';
import { UseLocalStorage } from '@components/CustomHooks/LocalStorage';
import NavItems from '@components/NavItems';
import Search from '@components/SearchComponent';
import TopHeaderMobile from '@components/WorldWideMenu/TopHeaderMobile';
import CompareProducts from '@components/compareProducts';
import { DropSvg, DropSvgOpen } from '@components/svgs';

const HeaderSection = ({ navData = [], logo, world }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [showSerach, setShowSearch] = useState(false);
  const isStorage = UseLocalStorage();
  const navigationData = navData?.primaryNav;
  const getNavItems = item => {
    const items = JSON.parse(JSON.stringify(item));
    const midIndex = Math.ceil(items?.fields?.navItems.length / 2);
    items?.fields?.navItems.splice(midIndex, 0, logo);
    return items?.fields?.navItems;
  };
  const openNavbar = event => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setNavbarOpen(!navbarOpen);
    }
  };
  const openNavbarWithSearch = event => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setNavbarOpen(!navbarOpen);
      setShowSearch(true);
    }
  };
  const [headerlabelBathroom, setHeaderLabelBathroom] = useState(false);
  const [headerLabelKitchen, setHeaderLabelKitchen] = useState(false);

  const menuIconClasses = cx(
    'w-full',
    'text-sm',
    'bg-white',
    'mt-14',
    'lg:bg-transparent',
    'lg:flex',
    'lg:mt-0'
  );
  const mobileMenuIcons = cx(
    'relative',
    'flex',
    'w-full',
    'lg:w-auto',
    'lg:static',
    'lg:block',
    'lg:justify-start',
    'mt-0',
    'md:mt-4'
  );

  const [top, setTop] = useState(true);

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);

  return navData ? (
    <>
      <div
        className={`sticky top-0 z-50 bg-[#fff] ${
          !top && `bg-white shadow-xl`
        } border-b-2 lg:border-b-0`}
      >
        <div>
          <section className='max-w-screen-lg mx-auto h-[80px]'>
            <div
              className='flex flex-wrap
          items-center
          justify-between
          w-full
          py-4
          md:py-0
          px-4
          text-lg text-gray
          bg-white'
            >
              {navigationData?.map((item, index) => {
                const navItems = getNavItems(item);

                return (
                  <div
                    className='flex flex-wrap sm:flex flex-1 justify-evenly '
                    key={index}
                  >
                    {/* {item?.fields?.headingLabel ? (
                      <div className="my-6 text-footertext font-['Helvetica'] text-[12px]">
                        {item?.fields?.headingLabel}
                      </div>
                    ) : null} */}
                    <div
                      className={
                        'w-full bg-white flex md:mt-5 lg:mt-0 bg-inherit lg:items-center lg:w-auto lg:flex lg:pl-2 absolute h-[100vh] overflow-y-auto lg:h-auto lg:overflow-hidden' +
                        (navbarOpen ? ' flex' : ' hidden') +
                        (navbarOpen ? ' mobileMenu' : '')
                      }
                    >
                      <div className={menuIconClasses}>
                        {navItems.map((navItem, key) =>
                          navItem?.file?.url ? (
                            <>
                              <div
                                key={navItem?.sys?.id}
                                className={
                                  'flex w-full text-#232323 font-helveticaLight text-sm	 uppercase sm:w-auto lg:inline-block  lg:border-0'
                                }
                              >
                                <Link
                                  href={navItem?.fields?.url || '/'}
                                  key={navItem?.fields?.sys?.id}
                                  target={
                                    navItem?.fields?.openerType === 'New Tab'
                                      ? '_blank'
                                      : ''
                                  }
                                >
                                  <div className='flex navItems-center mx-8'>
                                    {navItem?.file?.url ? (
                                      <div className='hidden lg:block'>
                                        <Image
                                          src={`https:${navItem?.file?.url}`}
                                          onClick={() => {
                                            setHeaderLabelBathroom(false);
                                            setHeaderLabelKitchen(false);
                                          }}
                                          blurDataURL={`https:${navItem?.file?.url}`}
                                          placeholder='blur'
                                          priority={1}
                                          className='text-black cursor-pointer'
                                          quality={100}
                                          alt='logo'
                                          height='72'
                                          width='132'
                                        />
                                      </div>
                                    ) : null}
                                  </div>
                                </Link>
                              </div>
                            </>
                          ) : (
                            <>
                              {navItem.fields.label ===
                                navigationData[0].fields.navItems[0].fields
                                  ?.ariaLabel &&
                                showSerach && (
                                  <span
                                    className='lg:hidden px-7'
                                    style={{ marginTop: '15px' }}
                                  >
                                    {' '}
                                    <Search />
                                  </span>
                                )}
                              <NavItems
                                key={key}
                                navItem={navItem}
                                onClick={() => setNavbarOpen(false)}
                                onFocus={() => setNavbarOpen(true)}
                                svgElement={<DropSvgOpen />}
                                svgElement1={<DropSvg />}
                                setHeaderLabelBathroom={setHeaderLabelBathroom}
                                headerLabelKitchen={headerLabelKitchen}
                                setHeaderLabelKitchen={setHeaderLabelKitchen}
                                justifyProp='space-between'
                                headerlabelBathroom={headerlabelBathroom}
                                bathroom={
                                  navigationData[0].fields.navItems[0].fields
                                    .ariaLabel
                                }
                                kitchen={
                                  navigationData[0].fields.navItems[1].fields
                                    .ariaLabel
                                }
                                classNames={cx(
                                  `flex w-full border-t-2 font-helveticaLight text-base text-black uppercase sm:w-auto lg:inline-block  lg:border-0`,
                                  {
                                    'lg:hover:bg-[#e9e9e9] p-2 cursor-pointer px-3.5 py-4 lg:p-6 lg:mx-10 xl:mx-12 lg:h-[80px]':
                                      !navItem?.file?.url
                                  }
                                )}
                                linkClass='flex font-helveticaLight font-bold lg:font-normal lg:p-[4px] w-full text-black'
                              />
                              {navItem.fields.label ===
                                navigationData[0].fields.navItems[0].fields
                                  ?.ariaLabel &&
                                headerlabelBathroom && (
                                  <div className='lg:hidden'>
                                    <h5 className='flex w-full bg-[#e5e5e5] border-b-1 text-base text-black text-sm font-bold sm:w-auto p-4 border-b border-[#dbdbdb]'>
                                      {
                                        navigationData[0]?.fields.navItems[0]
                                          .fields.ariaLabel
                                      }
                                    </h5>
                                    {navigationData?.[0].fields.navItems[0].fields.secondaryNavigation[0].fields.navItems?.map(
                                      (item, index) => (
                                        <NavItems
                                          key={index}
                                          navItem={item}
                                          openNavbar={e => openNavbar(e)}
                                          classNames='flex w-full bg-[#e5e5e5] border-b-1 text-base text-black text-sm font-bold sm:w-auto p-4 border-b border-[#dbdbdb]'
                                          linkClass='flex lg:p-[4px] w-full text-black cursor-pointer text-[15px]'
                                        />
                                      )
                                    )}
                                  </div>
                                )}
                              {navItem.fields.label ===
                                navigationData[0].fields.navItems[1].fields
                                  ?.ariaLabel &&
                                headerLabelKitchen && (
                                  <div className='lg:hidden'>
                                    <h5 className='flex w-full bg-[#e5e5e5] border-b-1 text-base text-black text-sm font-bold sm:w-auto p-4 border-b border-[#dbdbdb]'>
                                      {
                                        navigationData[0]?.fields.navItems[1]
                                          .fields.ariaLabel
                                      }
                                    </h5>
                                    {navigationData?.[0].fields.navItems[1].fields.secondaryNavigation[0].fields.navItems?.map(
                                      (item, index) => (
                                        <NavItems
                                          key={index}
                                          navItem={item}
                                          openNavbar={e => openNavbar(e)}
                                          classNames='flex w-full bg-[#e5e5e5] border-b-1 text-base text-black text-sm font-bold sm:w-auto p-4 border-b border-[#dbdbdb]'
                                          linkClass='flex lg:p-[4px] w-full text-black cursor-pointer text-[15px]'
                                        />
                                      )
                                    )}
                                  </div>
                                )}

                              <span
                                className='hidden lg:inline'
                                style={{ marginTop: '15px' }}
                              >
                                {navItem.fields.label ===
                                  navigationData[0].fields.navItems[2].fields
                                    ?.ariaLabel && <Search />}
                              </span>
                            </>
                          )
                        )}
                        <TopHeaderMobile
                          world={world}
                          openNavbar={openNavbar}
                        />
                      </div>
                    </div>

                    <div className={mobileMenuIcons}>
                      <button
                        className='outline-none flex lg:px-3 lg:py-1 order-1 text-xl leading-none bg-transparent border-l-0 border-t-0 border-b-0 rounded-none mr-4 cursor-pointer lg:hidden lg:outline-none'
                        type='button'
                        aria-label='menu'
                        aria-haspopup='true'
                        aria-expanded={navbarOpen}
                        onClick={openNavbar}
                      >
                        <FaBars className='align-middle h-7 text-white-500' />
                        {/* <span className='p-1 ml-3 align-bottom'>Menu</span> */}
                      </button>
                    </div>
                    <div className='absolute top-0 lg:hidden'>
                      <Link href='/'>
                        <Image
                          src={`https:${logo?.file?.url}`}
                          onClick={() => setNavbarOpen(false)}
                          blurDataURL={`https:${logo?.file?.url}`}
                          placeholder='blur'
                          priority={1}
                          className='text-black'
                          quality={100}
                          alt='logo'
                          height='56'
                          width='100'
                        />
                      </Link>
                    </div>
                  </div>
                );
              })}
              <button
                className={` lg:hidden order-1`}
                aria-expanded={navbarOpen}
                onClick={openNavbarWithSearch}
              >
                <HiSearch />
              </button>
            </div>
          </section>
        </div>
        {headerlabelBathroom && (
          <div
            className='hidden lg:block'
            style={{
              background: '#e5e5e5',
              boxShadow: '0px 3px 8px 0px #666',
              position: 'absolute',
              width: '100%'
            }}
          >
            <div style={{ marginLeft: '166px' }}>
              <div className='flex my-3'>
                <h5 className='mt-5 text-black uppercase text-3xl cursor-default mb-[45px]'>
                  {navigationData[0]?.fields.navItems[0].fields.ariaLabel}
                </h5>
                <span
                  className='mt-5 pl-[6px] pt-[5px] text-black'
                  // style={{ paddingTop: '9px', paddingLeft: '6px' }}
                >
                  <HiOutlineChevronRight size={25} />
                </span>
              </div>
              <div className='flex flex-col flex-wrap h-[200px] pb-[60px] w-1/3 '>
                {navigationData?.[0].fields.navItems[0].fields.secondaryNavigation[0].fields.navItems?.map(
                  (item, index) => (
                    <NavItems
                      key={index}
                      navItem={item}
                      openNavbar={e =>
                        setHeaderLabelBathroom(!headerlabelBathroom)
                      }
                      classNames='text-[#666666] hover:text-white cursor-pointer leading-tight pb-2 font-bold w-[40%]'
                      linkClass='text-[#666] text-helvaticaMedium font-bold hover:text-black text-xs cursor-pointer'
                    />
                  )
                )}
              </div>
            </div>
          </div>
        )}
        {headerLabelKitchen && (
          <div
            className='hidden lg:block'
            style={{
              background: '#e5e5e5',
              boxShadow: '0px 3px 8px 0px #666',
              position: 'absolute',
              width: '100%'
            }}
          >
            <div style={{ marginLeft: '166px' }}>
              <div className='flex my-3'>
                <h4 className='mt-5 text-black text-3xl font-medium uppercase cursor-default mb-[35px]'>
                  {navigationData?.[0]?.fields.navItems[1].fields.ariaLabel}
                </h4>
                <span
                  className='mt-5 pl-[6px] pt-[5px] text-black'
                  // style={{ paddingTop: '9px', paddingLeft: '6px' }}
                >
                  <HiOutlineChevronRight size={25} />
                </span>
              </div>
              <div
                className='flex flex-col flex-wrap h-[150px] pb-[60px] w-1/3'
                // style={{ height: '160px', width: '40%', marginBottom: '5px' }}
              >
                {navigationData?.[0].fields.navItems[1].fields.secondaryNavigation[0].fields.navItems?.map(
                  (item, index) => (
                    <NavItems
                      key={index}
                      navItem={item}
                      openNavbar={e =>
                        setHeaderLabelKitchen(!headerLabelKitchen)
                      }
                      classNames='text-[#666666] hover:text-white font-normal cursor-pointer pb-2 text-[12px]'
                      linkClass='flex text-[#666] text-helvaticaMedium font-bold hover:text-black text-xs cursor-pointer'
                    />
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {isStorage.length !== 0 && (
        <CompareProducts
          navbarOpen={navbarOpen}
          headerLabelKitchen={headerLabelKitchen}
          headerlabelBathroom={headerlabelBathroom}
          isStorage={isStorage}
        />
      )}
    </>
  ) : null;
};

export default HeaderSection;
