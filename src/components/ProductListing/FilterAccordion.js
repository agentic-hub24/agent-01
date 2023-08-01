import { useRef, useState, useEffect } from 'react';
import { PlusSvg, MinusSvg } from '@components/svgs';

const FilterAccordion = ({ children, header, subSlug }) => {
  const ref = useRef();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [subSlug]);
  return (
    <div className='mb-6 border-b border-gray-300' id={header}>
      <details ref={ref}>
        <summary className='list-none'>
          <span
            className='flex relative  justify-between mb-5 font-helvaticaFont text-[14px] leading-normal font-bold uppercase'
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

export default FilterAccordion;
