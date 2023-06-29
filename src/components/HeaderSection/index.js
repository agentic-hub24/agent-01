import { useEffect, useState } from 'react';
import {
  HiOutlineChevronRight,
  HiOutlineMenu,
  HiSearch,
  HiOutlineChevronDown
} from 'react-icons/hi';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavItems from '@components/NavItems';
import MobileNavItem from '@components/NavItems/MobileNavItem';
import TopHeaderMobile from '@components/WorldWideMenu/TopHeaderMobile';
import HeaderSearch from './HeaderSearch';

export default function HeaderSection({ navData = {}, world }) {
  const router = useRouter();
  const { locale = '' } = router;
  const { logo = {}, primaryNav = [] } = navData;
  const [top, setTop] = useState(true);
  //desktop- state
  const [navOpen, setNavOpen] = useState(false);
  const [secondaryNavItem, setSecondaryNavItem] = useState([]);
  const [secondaryNavLabel, setSecondaryNavLabel] = useState('');
  // mobile state
  const [secondaryNavItemMobile, setSecondaryNavItemMobile] = useState([]);
  const [secondaryNavLabelMobile, setSecondaryNavLabelMobile] = useState('');
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);

  useEffect(() => {
    setNavOpen(false);
  }, [locale]);

  const handleSecondaryNav = (e, secondaryNav) => {
    e.preventDefault();
    if (
      secondaryNavLabel.toUpperCase() ===
      secondaryNav?.fields?.label.toUpperCase()
    ) {
      setNavOpen(false);
      setSecondaryNavLabel('');
    } else {
      setSecondaryNavItem(secondaryNav?.fields?.secondaryNavigation);
      setSecondaryNavLabel(secondaryNav?.fields?.label);
    }
  };

  const secondaryNavItemFuncMobile = (e, secondaryNav) => {
    if (
      secondaryNavLabelMobile.toUpperCase() ===
      secondaryNav?.fields?.label.toUpperCase()
    ) {
      setSecondaryNavItemMobile([]);
      setSecondaryNavLabelMobile('');
    } else {
      setSecondaryNavItemMobile(secondaryNav?.fields?.secondaryNavigation);
      setSecondaryNavLabelMobile(secondaryNav?.fields?.label);
    }
  };

  useEffect(() => {
    if (secondaryNavItem && secondaryNavItem.length > 0) {
      setNavOpen(true);
    }
  }, [secondaryNavItem]);

  const handleSearch = e => {
    setSearchVisible(true);
    setOpenMobileMenu(true);
    if (searchVisible) {
      setSearchVisible(false);
    }
  };

  const handleHamburger = () => {
    setOpenMobileMenu(true);
    setSearchVisible(false);
    if (openMobileMenu) {
      setOpenMobileMenu(false);
      setSearchVisible(false);
    }
  };

  const handleIcon = (argLabel, argUrl) => {
    if (secondaryNavLabelMobile !== argLabel) {
      return <HiOutlineChevronRight size={20} />;
    } else {
      if (argUrl !== '#') {
        return <HiOutlineChevronRight size={20} />;
      }
      return <HiOutlineChevronDown size={20} />;
    }
  };

  return (
    <>
      {/* Header desktop --> start */}
      <div
        className={`bg-[#fff] text-[#232323] border-y z-40 sticky top-0 ${
          !top && `bg-white shadow-xl`
        } lg:block hidden`}
      >
        <div className='max-w-screen-lg mx-auto px-4 flex items-center justify-between h-[80px]'>
          <div className='flex items-center h-full'>
            <ul className='flex space-x-4 h-full text-[#232323]'>
              {primaryNav[0]?.fields?.navItems
                ?.slice(0, 2)
                ?.map((navItem, id) => (
                  <NavItems
                    key={id}
                    navItem={navItem}
                    secondaryNavItemFunc={(e, data) =>
                      handleSecondaryNav(e, data)
                    }
                    linkClass='text-[#232323]'
                    classNames='font-helveticaLight text-[16px] leading-loose font-light text-[#232323] uppercase px-6 py-6 hover:bg-[#e5e5e5] hover:opacity-75'
                  />
                ))}
            </ul>
          </div>

          {/* brand logo --start */}
          <div className='flex items-center hover:cursor-pointer'>
            <Link href='/' className='flex items-center mr-6'>
              <Image
                src={logo?.fields?.mediaItem?.fields?.asset?.fields?.file?.url}
                alt={logo?.fields?.mediaItem?.fields?.altText}
                className='h-6 w-auto mr-2'
                height={75}
                width={132}
                quality={100}
                onClick={() => setNavOpen(false)}
              />
            </Link>
          </div>
          {/* brand logo --end */}

          <div className='flex items-center h-full'>
            <ul className='flex space-x-4 h-full'>
              {primaryNav[0]?.fields?.navItems?.slice(2)?.map((navItem, id) => (
                <NavItems
                  key={id}
                  navItem={navItem}
                  linkClass='text-[#232323]'
                  classNames='font-helveticaLight text-[16px] leading-loose font-light text-[#232323] uppercase px-6 py-6 hover:bg-[#e5e5e5] hover:opacity-75'
                />
              ))}
            </ul>
            <HeaderSearch />
          </div>
        </div>
        <div className='absolute w-full '>
          {secondaryNavItem && navOpen && (
            <div className='bg-[#e5e5e5] text-[#232323] shadow p-6'>
              <div className='max-w-screen-lg mx-auto py-6 px-6'>
                <div className='text-3xl uppercase inline-flex'>
                  <span>{secondaryNavLabel}</span>
                  <span className='mt-1 ml-4'>
                    <HiOutlineChevronRight />
                  </span>
                </div>
                <div className='mt-7 flex'>
                  {secondaryNavItem?.map((secondaryNav, id) => {
                    return (
                      <ul className='flex flex-col pr-8' key={id}>
                        <li className='text-[14px] leading-tight font-normal font-HelveticaBold pb-1'>
                          {secondaryNav?.fields?.headingLabel}
                        </li>
                        {secondaryNav?.fields?.navItems?.map((navItem, id) => (
                          <NavItems
                            key={id}
                            navItem={navItem}
                            handleCloseHandle={() => setNavOpen(false)}
                            linkClass='text-[#666] hover:text-[#232323]'
                            classNames='font-helveticaMedium text-[13px] font-bold py-1'
                          />
                        ))}
                      </ul>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Header desktop --> end */}
      {/* Header mobile --> start */}
      <div
        className={`bg-[#fff] text-[#232323] border-y z-40 sticky top-0 ${
          !top && `bg-white shadow-xl`
        } lg:hidden`}
      >
        {/* Mobile menu header -- start */}
        <div className='flex justify-between items-center h-[60px] p-3 border-b-2'>
          <div
            className='flex text-[#bebebe] hover:cursor-pointer'
            onClick={() => handleHamburger()}
          >
            <HiOutlineMenu size={25} />
          </div>
          <div className='flex'>
            {/* brand logo --start */}
            <div className='flex items-center hover:cursor-pointer'>
              <Link href='/' className='flex items-center mr-6'>
                <Image
                  src={
                    logo?.fields?.mediaItem?.fields?.asset?.fields?.file?.url
                  }
                  alt={logo?.fields?.mediaItem?.fields?.altText}
                  className='h-6 w-auto mr-2'
                  height={60}
                  width={105}
                  quality={100}
                  onClick={() => setNavOpen(false)}
                />
              </Link>
            </div>
            {/* brand logo --end */}
          </div>
          <div className='flex text-[#bebebe]' onClick={e => handleSearch(e)}>
            <HiSearch size={25} />
          </div>
        </div>
        {/* mobile menu header--end */}
        {openMobileMenu && (
          <div className='height-max overflow-scroll absolute w-full z-50'>
            {searchVisible && openMobileMenu && (
              <div className='p-4 border-b flex w-full justify-center bg-[#fff]'>
                <HeaderSearch />
              </div>
            )}
            <div className='w-full bg-[#fff]'>
              {primaryNav &&
                primaryNav[0]?.fields?.navItems?.map((navItem, id) => (
                  <div key={id}>
                    <MobileNavItem
                      key={id}
                      navItem={navItem}
                      secondaryNavItemFuncMobile={(e, data) =>
                        secondaryNavItemFuncMobile(e, data)
                      }
                      justifyProp='space-between'
                      svgElement={handleIcon(
                        navItem?.fields?.label,
                        navItem?.fields?.url
                      )}
                      linkClass='text-[#000] flex'
                      classNames='uppercase font-helveticaLight font-bold leading-normal py-[16px] px-[14px] border-b'
                    />
                    {secondaryNavItemMobile &&
                      secondaryNavLabelMobile === navItem?.fields?.label && (
                        <div className='bg-[#e5e5e5] text-[#232323] shadow '>
                          <div className='font-helveticaLight font-bold leading-normal py-[16px] px-[14px] border-b border-[#dbdbdb]'>
                            <span>{secondaryNavLabelMobile}</span>
                          </div>
                          <div className=''>
                            {secondaryNavItemMobile?.map((secondaryNav, id) => {
                              return (
                                <ul className='flex flex-col pr-8' key={id}>
                                  {secondaryNav?.fields?.navItems?.map(
                                    (navItem, id) => (
                                      <MobileNavItem
                                        key={id}
                                        navItem={navItem}
                                        handleCloseHandle={() => {
                                          setOpenMobileMenu(false);
                                          setSecondaryNavItemMobile([]);
                                        }}
                                        linkClass='text-[#000]'
                                        classNames='font-helveticaLight font-bold leading-normal py-[16px] px-[14px] border-b border-[#dbdbdb]'
                                      />
                                    )
                                  )}
                                </ul>
                              );
                            })}
                          </div>
                        </div>
                      )}
                  </div>
                ))}
            </div>
            <TopHeaderMobile
              world={world}
              handleCloseHandle={e => setOpenMobileMenu(e)}
            />
          </div>
        )}
      </div>
    </>
  );
}

HeaderSection.defaultProps = {
  navData: {},
  world: {}
};
