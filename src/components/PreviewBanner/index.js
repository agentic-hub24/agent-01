import Link from 'next/link';
import { useRouter } from 'next/router';

const PreviewBanner = () => {
  const router = useRouter();

  return (
    <div className='sticky top-0 flex justify-center z-[10000]'>
      <Link href={`/api/cancel-preview?redirect=${router.asPath}`} legacyBehavior>
        <button className='w-full h-10 bg-red-400 cursor-pointer text-white font-bold'>
          EXIT PREVIEW MODE
        </button>
      </Link>
    </div>
  );
};

export default PreviewBanner;
