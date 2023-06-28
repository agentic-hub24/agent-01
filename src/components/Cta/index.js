import { useRouter } from 'next/router';

const CTAURL = {
  en: 'http://ips-invite.iperceptions.com/webValidator.aspx?sdfc=355b766d-129713-c733c77b-141a-42d7-be9f-2e52b426622b&lID=1&source=102226',
  es: 'http://ips-invite.iperceptions.com/webValidator.aspx?sdfc=355b766d-129714-c733c77b-141a-42d7-be9f-2e52b426622b&lID=1&source=102226'
};

const Cta = ({ fields }) => {
  const router = useRouter();
  const { locale = '' } = router;
  const openPopUp = () => {
    let url = CTAURL[locale];
    let height = 700;
    let width = 700;
    var left = (screen.width - width) / 2;
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
