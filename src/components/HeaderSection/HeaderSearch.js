import { HiSearch } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { searchLabel } from '@utils/footerUtils';

export default function HeaderSearch() {
  const router = useRouter();
  const { locale = '' } = router;
  return (
    <div className='flex items-center ml-4 w-full'>
      <div className='relative w-full'>
        <input
          type='text'
          className='w-full py-2 px-4 pr-10 border-b border-[#ddd] bg-[#f5f5f5] text-[12px]  rounded-lg focus:outline-none focus:border-gray-400'
          placeholder={searchLabel[locale]}
        />
        <button className='absolute right-0 top-0 bottom-0 px-3 py-2 text-[20px] text-[#bebebe]'>
          <HiSearch />
        </button>
      </div>
    </div>
  );
}
