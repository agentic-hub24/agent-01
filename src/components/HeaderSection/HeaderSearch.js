import { useState, useEffect } from 'react';
import { HiSearch } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { searchLabel, removeQuotesFromString } from '@utils/footerUtils';

export default function HeaderSearch({ setOpenMobileMenu }) {
  const router = useRouter();
  const { locale = '' } = router;
  const [searchValue, setSearchvalue] = useState('');

  useEffect(() => {
    setSearchvalue('');
  }, []);
  const handleKeyUp = event => {
    if (event.key === 'Enter') {
      router.push(`/results?search=${searchValue}&currentPage=1`);
      setOpenMobileMenu(false);
    }
  };
  const searchOnClick = () => {
    if (searchValue) {
      router.push(`/results?search=${searchValue}&currentPage=1`);
      setOpenMobileMenu(false);
    }
  };
  const handleChange = e => {
    setSearchvalue(removeQuotesFromString(e.target.value));
  };

  return (
    <div className='flex items-center ml-4 w-full'>
      <div className='relative w-full'>
        <input
          type='text'
          className='w-full py-2 px-4 pr-10 border-b border-[#ddd] bg-[#f5f5f5] text-[12px]  rounded-lg focus:outline-none focus:border-gray-400'
          placeholder={searchLabel[locale]}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
        <button
          className='absolute right-0 top-0 bottom-0 px-3 py-2 text-[20px] text-[#bebebe]'
          onClick={searchOnClick}
        >
          <HiSearch />
        </button>
      </div>
    </div>
  );
}

HeaderSearch.defaultProps = {
  setOpenMobileMenu: () => {}
};
