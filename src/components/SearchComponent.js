import { useEffect, useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { useRouter } from 'next/router';

const Search = () => {
  const router = useRouter();
  const [searchValue, setSearchvalue] = useState('');

  useEffect(() => {
    setSearchvalue('');
  }, []);
  const handleKeyUp = event => {
    if (event.key === 'Enter') {
      router.push(`/results?search=${searchValue}&currentPage=1`);
    }
  };

  const searchOnClick = () => {
    if (searchValue) {
      router.push(`/results?search=${searchValue}&currentPage=1`);
    }
  };
  return (
    <div className='grid content-center pl-4'>
      <label className='relative flex h-10' id='search'>
        <span className='sr-only'>Search</span>
        <input
          className='placeholder:text-slate-400 block bg-search w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-black focus:ring-black focus:ring-1 sm:text-sm'
          placeholder='Search'
          type='text'
          name='search'
          onChange={event => setSearchvalue(event.target.value)}
          onKeyUp={handleKeyUp}
          onClick={searchOnClick}
        />
        <span className='absolute right-0 inset-y-0 flex items-center pr-2 text-slate-400'>
          <HiSearch />
        </span>
      </label>
    </div>
  );
};
export default Search;
