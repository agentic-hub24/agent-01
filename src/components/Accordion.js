import { useRef, useState } from 'react';
import classNames from 'classnames';
import { DropSvg, DropSvgOpen } from './svgs';

const Accordion = ({
  header,
  children,
  isActive,
  isHeader,
  isNavHeader,
  isTopNavMobile,
  isTopNavMobileLogo,
  isTopNavInnerData,
  isTopNavSubInnerData,
  isTopNavInnerContainer
}) => {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const handleDropSvg = () => {
    if (children) {
      setOpen(!ref.current.open);
    }
  };
  const footerHeadingClass = classNames(
    'flex flex-1  justify-between items-center',
    {
      "my-1 flex justify-between text-footertext font-['Helvetica'] text-[14px] uppercase cursor-default":
        isActive
    },
    {
      "my-1 flex justify-between font-['Helvetica'] text-[16px] uppercase cursor-default":
        isNavHeader
    },
    {
      'font-helveticaLight text-[16px] cursor-default font-semibold':
        isTopNavMobile
    },
    {
      'font-helveticaLight text-[18px] cursor-default font-semibold':
        isTopNavMobileLogo
    },
    {
      'font-helveticaLight text-[16px] cursor-default font-semibold':
        isTopNavInnerData
    },
    {
      'font-helveticaLight text-[12px] text-white opacity-70 font-semibold':
        isTopNavSubInnerData
    }
  );

  return (
    <div className='mx-auto select-none max-w-full'>
      <details
        ref={ref}
        className={classNames('', {
          'bg-[#232323]': isActive,
          // "rounded shadow group bg-white": !isActive,
          'bg-[#999999]': isNavHeader
        })}
      >
        <summary
          className={classNames('', {
            'flex p-3.5 flex-wrap items-center list-none cursor-pointer':
              isHeader,
            'flex border-b-[1px] border-[#666] flex-wrap items-center list-none cursor-pointer':
              isNavHeader,
            'flex border-b-[1px] border-[#666] py-[16px] px-[18px] bg-[#666] flex-wrap items-center list-none cursor-pointer border-b-2 border-black':
              !isHeader,
            'flex py-[5px] px-[25px] bg-neutral-600 border-b border-black':
              isTopNavInnerContainer
          })}
          onClick={() => handleDropSvg()}
        >
          <h4 className={footerHeadingClass}>
            {header} {!open ? <DropSvgOpen /> : <DropSvg />}
          </h4>
        </summary>
        {open ? children : null}
      </details>
    </div>
  );
};

export default Accordion;
