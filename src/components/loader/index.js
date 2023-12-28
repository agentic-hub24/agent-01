import PropTypes from 'prop-types';

export default function Loader({ loading = true }) {
  return (
    <>
      {loading && (
        <div className='fixed top-[50%] left-[50%] w-[56px] h-[56px] cursor-pointer z-50 pt-[2px]'>
          {/* overlay */}
          <div className='fixed inset-0 bg-white bg-opacity-30 transition-opacity'></div>
          <div className='loader'></div>
        </div>
      )}
    </>
  );
}

Loader.propTypes = {
  loading: PropTypes.bool.isRequired
};
