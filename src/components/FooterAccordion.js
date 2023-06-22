import classNames from 'classnames';
import { DropSvg, DropSvgOpen } from './svgs';

const FooterAccordion = ({
  header,
  children,
  isActive,
  isHeader,
  isNavHeader,
  isTopNavMobile,
  isTopNavMobileLogo,
  handleToggle,
  open
}) => {
  const footerHeadingClass = classNames(
    'flex flex-1 font-semibold justify-between items-center',
    {
      "my-1 flex justify-between text-footertext font-['Helvetica'] text-[14px] uppercase cursor-default":
        isActive
    },
    {
      "my-1 flex justify-between font-['Helvetica'] text-[16px] uppercase cursor-default":
        isNavHeader
    },
    {
      "font-['Helvetica'] text-[16px] uppercase cursor-default  font-medium":
        isTopNavMobile
    },
    {
      "font-['Helvetica'] text-[16px] cursor-default  font-medium":
        isTopNavMobileLogo
    }
  );

  return (
    <div className='mx-auto select-none max-w-full'>
      <div
        className={classNames('', {
          'bg-[#232323]': isActive,
          'bg-[#999999]': isNavHeader
        })}
      >
        <div
          className={classNames('', {
            'flex p-3.5 flex-wrap items-center list-none cursor-pointer':
              isHeader,
            'flex border-b-[1px] border-[#666] flex-wrap items-center list-none cursor-pointer':
              isNavHeader,
            'flex border-b-[1px] border-[#666] p-6 bg-sidebar flex-wrap items-center list-none cursor-pointer':
              !isHeader
          })}
          onClick={() => handleToggle(header)}
        >
          <h4 className={footerHeadingClass}>
            {header} {!open ? <DropSvgOpen /> : <DropSvg />}
          </h4>
        </div>
        {/* {open ? children : null} */}
        {/*Changing this to below coz Cookie modal does open for smaller screens*/}
        <div style={{ display: open ? 'block' : 'none' }}>{children}</div>
      </div>
    </div>
  );
};

export default FooterAccordion;
