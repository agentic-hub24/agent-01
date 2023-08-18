import { useState, useEffect } from 'react';
import { HiSearch } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { getSuggestions } from '@services/productListingAPI/client';
import { searchLabel, removeQuotesFromString } from '@utils/footerUtils';
import Suggestion from './Suggestion';

export default function HeaderSearch({ setOpenMobileMenu }) {
  const router = useRouter();
  const { locale = '' } = router;
  const [searchValue, setSearchvalue] = useState('');
  const [suggestionList, setSuggestionList] = useState({});

  useEffect(() => {
    setSearchvalue('');
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchValue.trim().length === 0) {
        setSuggestionList({});
        return false;
      }
      if (searchValue.trim().length < 3) {
        return false;
      }
      const data = await getSuggestions({
        search: removeQuotesFromString(searchValue)
      });
      setSuggestionList(data);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchValue, 500]);

  const handleKeyUp = event => {
    if (event.key === 'Enter') {
      router.push(`/results?search=${searchValue}&currentPage=1`);
      setOpenMobileMenu(false);
      setSuggestionList({});
    }
  };
  const searchOnClick = () => {
    if (searchValue) {
      router.push(`/results?search=${searchValue}&currentPage=1`);
      setOpenMobileMenu(false);
      setSuggestionList({});
    }
  };
  const handleChange = e => {
    setSearchvalue(removeQuotesFromString(e.target.value));
  };

  const searchOnSuggestion = (selectedVal, pageRedirection) => {
    if (selectedVal) {
      setOpenMobileMenu(false);
      setSearchvalue('');
      setSuggestionList({});
      // if (pageRedirection === 'PDP') {
      //   window.location = `/${locale}/product-detail/${
      //     selectedVal.split('-')
      //   }?skuid=K-${selectedVal}`;
      //   return false;
      // }
      router.push(`/results?search=${selectedVal}&currentPage=1`);
    }
  };

  return (
    <div className='flex items-center ml-4 w-full' style={{ zIndex: 1000 }}>
      <div className='relative w-full'>
        <input
          type='text'
          className='w-full py-2 px-4 pr-10 border-b border-[#ddd] bg-[#f5f5f5] text-[12px] rounded-lg focus:outline-none focus:border-gray-400'
          placeholder={searchLabel[locale]}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          value={searchValue}
        />
        <button
          className='absolute right-0 top-0 bottom-0 px-3 py-2 text-[20px] text-[#bebebe]'
          onClick={searchOnClick}
        >
          <HiSearch />
        </button>
        <Suggestion
          searchTerm={searchValue}
          list={suggestionList}
          searchOnSuggestion={searchOnSuggestion}
        />
      </div>
    </div>
  );
}

HeaderSearch.defaultProps = {
  setOpenMobileMenu: () => {}
};
