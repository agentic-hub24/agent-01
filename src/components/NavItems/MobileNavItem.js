import { useEffect, useState } from 'react';
import Link from 'next/link';

const MobileNavItem = ({
  navItem,
  classNames,
  stylePro,
  justifyProp,
  linkClass,
  svgElement,
  secondaryNavItemFuncMobile,
  handleCloseHandle
}) => {
  const [cookieClass, setCookieClass] = useState('');

  useEffect(() => {
    if (navItem?.fields?.label === 'Cookies Settings') {
      setCookieClass('ot-sdk-show-settings');
    }
  }, []);

  return (
    <div
      key={navItem?.sys?.id}
      className={classNames}
      onClick={e => secondaryNavItemFuncMobile(e, navItem)}
    >
      <Link passHref href={navItem?.fields?.url || ''}>
        <a
          key={navItem?.fields?.sys?.id}
          target={navItem?.fields?.openerType === 'New Tab' ? '_blank' : ''}
          id={
            navItem?.fields?.label === 'Cookies Settings' ? 'ot-sdk-link' : ''
          }
          className={cookieClass}
          style={{ textDecoration: 'none', width: '100%' }}
          rel='noreferrer'
          onClick={() => handleCloseHandle()}
        >
          <div
            className={linkClass}
            style={{ padding: stylePro, justifyContent: justifyProp }}
          >
            {/* {socialIcon ? <span className="mr-1">{socialIcon}</span> : null} */}
            {navItem?.fields?.label ? (
              <>
                <span>{navItem?.fields?.label}</span>
                <span>{svgElement}</span>
              </>
            ) : null}
          </div>
        </a>
      </Link>
    </div>
  );
};
export default MobileNavItem;

MobileNavItem.defaultProps = {
  secondaryNavItemFuncMobile: () => {},
  navItem: {},
  classNames: '',
  stylePro: '',
  justifyProp: '',
  linkClass: '',
  svgElement: <></>,
  handleCloseHandle: () => {}
};
