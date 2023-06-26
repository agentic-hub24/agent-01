import { useRef, useState, useEffect } from 'react';
import { PlusSvg, MinusSvg } from '@components/svgs';

const SearchAccordion = ({ children, header, subSlug }) => {
  const ref = useRef();
  const [open, setOpen] = useState(false);

  return (
    <div className='w-full  bg-gray-100 float-right lg:w-[calc(100%-210px)] md:w-[calc(100%-210px)] border-b'>
      <details ref={ref}>
        <summary className='list-none'>
          <span
            className='flex justify-between relative p-[20px] text-[14px] leading-1  font-bold uppercase text-gray-800 '
            onClick={() => setOpen(!ref.current.open)}
          >
            {header}
            {!open ? <PlusSvg /> : <MinusSvg />}
          </span>
        </summary>
        {open ? children : null}
      </details>
    </div>
  );
};

export default SearchAccordion;
