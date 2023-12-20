import { useRouter } from 'next/router';

const CTAURL = {
  en: process.env.NEXT_PUBLIC_EMPLIFY_EN,
  es: process.env.NEXT_PUBLIC_EMPLIFY_ES
};

const Cta = ({ fields }) => {
  const router = useRouter();
  const { locale = '' } = router;
  const openPopUp = () => {
    let url = CTAURL[locale];
    let height = 700;
    let width = 700;
    let left = (screen.width - width) / 2;
    window.open(
      url,
      'center window',
      'resizable = yes, width=' +
        width +
        ', height=' +
        height +
        ', top=0' +
        ', left=' +
        left
    );
  };

  return (
    <div className='p-[20px] max-w-screen-lg mx-auto text-right '>
      <span
        onClick={openPopUp}
        className='font-HelveticaRomanpx-[10px] pb-[10] text-[12px] text-black cursor-pointer hover:underline'
      >
        {fields.label}
      </span>
    </div>
  );
};

export default Cta;
