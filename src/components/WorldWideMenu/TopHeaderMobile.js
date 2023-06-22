import { useRouter } from 'next/router';
import { DropSvg, DropSvgOpen } from '@components/svgs';
import Accordion from '../Accordion';
import NavItems from '../NavItems';

const TopHeaderMobile = ({ world, openNavbar }) => {
  const router = useRouter();
  const topNavMenu = world?.items[0]?.fields?.topNav[1].fields.navItems;
  const logo = world?.items[0]?.fields?.topNav[1].fields.navItems[0];
  const handleRedirect = url => {
    router.push(url);
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
        {/** where-to-buy technical assistance header */}
        {topNavMenu?.slice(1)?.map((item, index) => {
          return (
            <div
              onClick={e => {
                handleRedirect(item?.fields?.url);
                openNavbar(e);
              }}
              key={index}
              style={{ borderBottom: '1px solid #4d4d4f' }}
            >
              <Accordion
                key={index}
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
              color: 'white'
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
                          <NavItems
                            key={index}
                            navItem={navItem}
                            svgElement={<DropSvgOpen />}
                            svgElement1={<DropSvg />}
                            justifyProp='space-between'
                            classNames='hover:text-white text-white cursor-pointer text-[14px] md:text-[22px]'
                            stylePro='5px 20px'
                            linkClass='flex lg:p-[4px] w-full text-white bg-neutral-600 border-b border-black font-helveticaLight text-[12px] text-white opacity-70 font-semibold'
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
                  key={index}
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
                        alt=''
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
export default TopHeaderMobile;
