import { useEffect, useState } from 'react';
import Link from 'next/link';

const NavItems = ({
  navItem,
  classNames,
  svgElement,
  svgElement1,
  stylePro,
  justifyProp,
  linkClass,
  headerlabelBathroom,
  setHeaderLabelBathroom,
  setHeaderLabelKitchen,
  headerLabelKitchen,
  bathroom,
  kitchen,
  openNavbar
}) => {
  // const socialIcon = getSocialIcon(navItem?.fields?.label);
  const [cookieClass, setCookieClass] = useState('');
  const [svgChange, setSvgChange] = useState(false);

  useEffect(() => {
    if (navItem?.fields?.label === 'Cookies Settings') {
      setCookieClass('ot-sdk-show-settings');
    }
  }, []);
  const handleClick = data => {
    if (data === bathroom) {
      setSvgChange(!svgChange);
      setHeaderLabelBathroom(!headerlabelBathroom);
      headerLabelKitchen && setHeaderLabelKitchen(!headerLabelKitchen);
    }
    if (data === kitchen) {
      setHeaderLabelKitchen(!headerLabelKitchen);
      setSvgChange(!svgChange);
      headerlabelBathroom && setHeaderLabelBathroom(!headerlabelBathroom);
    }
  };
  return (
    <div key={navItem?.sys?.id} className={classNames}>
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
          onClick={e => openNavbar(e)}
        >
          <div
            className={linkClass}
            style={{ padding: stylePro, justifyContent: justifyProp }}
            onClick={() => handleClick(navItem?.fields?.label)}
          >
            {/* {socialIcon ? <span className="mr-1">{socialIcon}</span> : null} */}
            {navItem?.fields?.label ? (
              <>
                <span onClick={() => handleClick(navItem?.fields?.label)}>
                  {navItem?.fields?.label}
                </span>
                <span className='lg:hidden'>
                  {!svgChange ? svgElement : svgElement1}
                </span>
              </>
            ) : null}
          </div>
        </a>
      </Link>
    </div>
  );
};
export default NavItems;

NavItems.defaultProps = {
  openNavbar: () => {}
};
