import PropTypes from 'prop-types';

export default function PLPHeader({ productCount, pageHeading }) {
  return (
    <div className='flex flex-col pt-[50px] pb-[22px] m-[10px] border-b-2 md:border-b-0 w-full'>
      {/* header from CTFL */}
      <h1 className='font-helveticaLight text-3xl uppercase font-light leading-snug'>
        {pageHeading}
      </h1>
      <h6 className='text-[#999] font-HelveticaLight leading-none font-normal'>
        {productCount} Products
      </h6>
    </div>
  );
}

PLPHeader.propTypes = {
  productCount: PropTypes.string,
  pageHeading: PropTypes.string
};

PLPHeader.defaultProps = {
  productCount: '',
  pageHeading: ''
};
