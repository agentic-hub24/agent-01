/* eslint-disable @next/next/no-img-element */
import { HiOutlineChevronRight } from 'react-icons/hi';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Accordion from '../Accordion';
import MobileNavItem from '../NavItems/MobileNavItem';

const TopHeaderMobile = ({ world = {}, handleCloseHandle }) => {
  const router = useRouter();
  const topNavMenu = world?.items[0]?.fields?.topNav[2].fields.navItems;
  const logo = world?.items[0]?.fields?.topNav[2].fields.navItems[0];
  const handleRedirect = url => {
    router.push(url, undefined, { locale: url.replace('/', '') });
  };
  return (
    <div className='lg:hidden md:block'>
      <div
        className=''
        style={{
          background: '#232323',
          color: '#fff'
        }}
      >
        {/** where-to-buy contact us */}
        {topNavMenu?.slice(3)?.map((item, index) => {
          return (
            <div
              onClick={() => {
                handleRedirect(item?.fields?.url);
                handleCloseHandle(false);
              }}
              key={item?.sys?.id || index}
              style={{ borderBottom: '1px solid #4d4d4f' }}
            >
              <Accordion
                key={item?.sys?.id || index}
                // isActive={true}
                header={item?.fields?.label}
                style={{
                  color: 'black'
                }}
                isHeader={true}
                isTopNavMobile={true}
              />
            </div>
          );
        })}

        {/** kohler worldwide */}
        <div style={{ borderBottom: '1px solid #4d4d4f' }}>
          <Accordion
            key='a'
            // isActive={true}
            header={logo?.fields?.label}
            style={{ color: 'black' }}
            isHeader={true}
            isTopNavMobileLogo={true}
          >
            <div
              style={{
                color: 'white',
                borderBottom: '1px solid #4d4d4f'
              }}
            >
              <section className='w-full'>
                <div className='justify-evenly'>
                  {world?.items?.map((item, index) =>
                    item?.fields?.primaryNav?.map(i => (
                      <Accordion
                        key={i?.sys?.id || index}
                        item={item}
                        // isNavHeader={true}
                        header={String(i.fields.internalTitle).replace(
                          'WWM - K&B Primary Nav ',
                          ''
                        )}
                        isTopNavInnerData={true}
                      >
                        {i.fields.navItems.map((navItem, index) => {
                          return (
                            <MobileNavItem
                              key={navItem?.sys?.id || index}
                              navItem={navItem}
                              svgElement={<HiOutlineChevronRight size={20} />}
                              classNames='hover:text-white text-white cursor-pointer text-[14px] md:text-[22px]'
                              linkClass='flex justify-between lg:p-[4px] w-full text-white bg-neutral-600 border-b border-black font-helveticaLight text-[12px] text-white opacity-70 font-semibold px-[20px] py-[5px]'
                            />
                          );
                        })}
                      </Accordion>
                    ))
                  )}
                </div>
              </section>
            </div>
          </Accordion>
        </div>
        {/** EN/ES header */}
        {topNavMenu?.slice(1, 3)?.map((item, index) => {
          return (
            <div
              onClick={() => {
                handleRedirect(item?.fields?.url);
                handleCloseHandle(false);
              }}
              key={index}
              style={{ borderBottom: '1px solid #4d4d4f' }}
            >
              <Accordion
                key={item?.sys?.id || index}
                // isActive={true}
                header={item?.fields?.label}
                style={{
                  color: 'black'
                }}
                isHeader={true}
                isTopNavMobile={true}
              />
            </div>
          );
        })}
        <div
          className=''
          style={{ padding: '24px', color: '#b5b5b5', background: '#666' }}
        >
          {world?.items &&
            world?.items[0]?.fields?.bottomNav?.fields?.navItems?.map(
              (i, index) => (
                <ul
                  style={{
                    listStyle: 'none',
                    textAlign: 'left',
                    background: '#666'
                  }}
                  key={i?.sys?.id || index}
                >
                  <li>
                    <a
                      href={i.fields.url}
                      target='_blank'
                      rel='noreferrer'
                      style={{ padding: '0px 10px', listStyle: 'nono' }}
                    >
                      <img
                        style={{ paddingLeft: '10px', paddingRight: '10px' }}
                        src={i.fields.mediaItem[0].fields.asset.fields.file.url}
                        alt={i.fields.mediaItem[0].fields?.altText}
                        aria-label={i.fields.mediaItem[0].fields?.altText}
                      />
                    </a>
                  </li>
                </ul>
              )
            )}
        </div>
      </div>
    </div>
  );
};
TopHeaderMobile.propTypes = {
  world: PropTypes.shape({
    sys: PropTypes.shape({
      id: PropTypes.string
    }),
    fields: PropTypes.shape({
      topNav: PropTypes.arrayOf(PropTypes.shape({}))
    })
  }),
  handleCloseHandle: PropTypes.func
};
export default TopHeaderMobile;
