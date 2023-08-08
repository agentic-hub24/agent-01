import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavItems from '@components/NavItems';

export default function WorldWideMenu({ world }) {
  const router = useRouter();
  const { locale = '' } = router;
  const [open, setOpen] = useState(false);
  const topNavMenu = world?.items[0]?.fields?.topNav[2].fields.navItems;
  const logo = world?.items[0]?.fields?.topNav[2].fields.navItems[0];
  return (
    <div className='hidden lg:block '>
      <div className='h-[34px] bg-[#232323] text-[#b5b5b5] border-b-2 border-slate-800'>
        <div className='flex justify-between flex-rows max-w-screen-lg mx-auto pt-[6px]'>
          <div className='flex px-6'>
            <Link href={logo?.fields?.url || '/'}>
              <h4
                className='text-sm cursor-pointer hover:text-white font-helveticaGroup no-underline text-[#bebebe]'
                style={{
                  padding: '0px 15px',
                  borderRight: '1px solid #333',
                  borderLeft: '1px solid #333'
                }}
                aria-label={logo?.fields?.ariaLabel}
                onClick={() => {
                  setOpen(!open);
                }}
              >
                {logo?.fields?.label}
              </h4>
            </Link>
            <div className='ml-9 flex'>
              {topNavMenu?.slice(1, 3)?.map((item, index) => (
                <Link
                  href={item?.fields?.url || '/'}
                  key={index}
                  locale={item?.fields?.url.replace('/', '')}
                >
                  <div>
                    <h4
                      className={`text-sm px-1 cursor-pointer hover:text-white font-helveticaGroup no-underline ${
                        locale.toUpperCase() ===
                          item?.fields?.label.toUpperCase() &&
                        locale.toUpperCase() === 'EN'
                          ? `selected-locale-right selected-locale-color`
                          : locale.toUpperCase() ===
                              item?.fields?.label.toUpperCase() &&
                            locale.toUpperCase() === 'ES'
                          ? `selected-locale-left selected-locale-color`
                          : `locale-color`
                      }`}
                      aria-label={item?.fields?.ariaLabel}
                    >
                      {item?.fields?.label.toUpperCase()}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className='flex  flex-rows'>
            {topNavMenu?.slice(3)?.map((item, index) => (
              <Link
                href={item?.fields?.url || '/'}
                key={index}
                locale={item?.fields?.url.replace('/', '')}
              >
                <h4
                  className='text-sm cursor-pointer hover:text-white font-helveticaGroup no-underline text-[#bebebe]'
                  style={{
                    padding: '0px 15px',
                    borderRight: '1px solid #333',
                    borderLeft: '1px solid #333'
                  }}
                  aria-label={item?.fields?.ariaLabel}
                >
                  {item?.fields?.label.toUpperCase()}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {open && (
        <div
          className='transition duration-500 origin-top-right '
          style={{
            background: '#232323',
            color: '#e5e5e5'
            // maxHeight: open === true ? '500px' : '0px'
          }}
          onMouseLeave={() => setOpen(false)}
        >
          <section className='max-w-screen-lg mx-auto pl-[2.5rem]'>
            <div className='flex justify-between pt-5 '>
              {world?.items?.map(item =>
                item?.fields?.primaryNav?.map(i => (
                  <div className='' key={item?.sys?.id}>
                    <div className="font-['Helvetica'] text-[13px] cursor-default">
                      {String(i.fields.internalTitle).replace(
                        'WWM - K&B Primary Nav ',
                        ''
                      )}
                    </div>
                    {i?.fields?.navItems?.map((navItem, index) => (
                      <NavItems
                        key={index}
                        navItem={navItem}
                        classNames='hover:text-white text-[#999999] cursor-pointer text-[13px]'
                        linkClass='flex lg:p-[5px] w-full hover:text-white text-[#999999]'
                      />
                    ))}
                  </div>
                ))
              )}
            </div>
            <div
              className='flex'
              style={{ color: '#b5b5b5', marginTop: '20px', marginLeft: '4px' }}
            >
              {world.items &&
                world?.items[0]?.fields?.bottomNav?.fields?.navItems?.map(i => (
                  <>
                    <ul
                      style={{
                        borderRight: 'solid 1px #333',
                        listStyle: 'none',
                        textAlign: 'left'
                      }}
                    >
                      <li>
                        <a
                          href={i.fields.url}
                          target='_blank'
                          rel='noreferrer'
                          style={{ padding: '0px 10px', listStyle: 'nono' }}
                        >
                          <img
                            style={{
                              paddingLeft: '10px',
                              paddingRight: '10px'
                            }}
                            src={
                              i.fields.mediaItem[0].fields.asset.fields.file.url
                            }
                          />
                        </a>
                      </li>
                    </ul>
                  </>
                ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
