const Cta = ({ fields }) => {
  const openPopUp = () => {
    let url =
      'https://collect.iperceptions.com/?lID=16&rn=126323&vm=1&pID=1&hs1=102214&hs2=102226&uni=1&siteID=1&am=false&referrer=https%3a%2f%2fkohler.atlassian.net%2f&sdfc=355b766d-126323-c733c77b-141a-42d7-be9f-2e52b426622b&source=102226';
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
