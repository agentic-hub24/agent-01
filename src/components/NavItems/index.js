import { useEffect, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const NavItems = ({
  navItem,
  classNames,
  linkClass,
  secondaryNavItemFunc,
  handleCloseHandle
}) => {
  const [cookieClass, setCookieClass] = useState('');

  useEffect(() => {
    if (navItem?.fields?.label.trim() === 'Cookies Settings') {
      setCookieClass('ot-sdk-show-settings');
    }
  }, []);

  return (
    <div
      key={navItem?.sys?.id}
      className={classNames}
      onClick={e => secondaryNavItemFunc(e, navItem)}
    >
      <Link passHref href={navItem?.fields?.url || ''} legacyBehavior>
        <a
          key={navItem?.fields?.sys?.id}
          target={navItem?.fields?.openerType === 'New Tab' ? '_blank' : ''}
          id={
            navItem?.fields?.label.trim() === 'Cookies Settings'
              ? 'ot-sdk-link'
              : ''
          }
          className={cookieClass}
          style={{ textDecoration: 'none', width: '100%' }}
          rel='noreferrer'
          onClick={() => handleCloseHandle()}
        >
          <div className={linkClass}>
            {navItem?.fields?.label ? (
              <span>{navItem?.fields?.label}</span>
            ) : null}
          </div>
        </a>
      </Link>
    </div>
  );
};
export default NavItems;

NavItems.propTypes = {
  navItem: PropTypes.object,
  secondaryNavItemFunc: PropTypes.func,
  linkClass: PropTypes.string,
  classNames: PropTypes.string,
  handleCloseHandle: PropTypes.func
};

NavItems.defaultProps = {
  secondaryNavItemFunc: () => {},
  handleCloseHandle: () => {},
  navItem: {},
  classNames: '',
  linkClass: ''
};
