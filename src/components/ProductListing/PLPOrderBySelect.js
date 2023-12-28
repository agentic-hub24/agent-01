/* eslint-disable no-useless-escape */
import PropTypes from 'prop-types';

export default function PLPOrderBySelect({ orderBySelect, sortingArray }) {
  return (
    <div className='flex md:mt-[58px] md:mb-[55px] mx-[10px] relative md:w-1/3 w-full'>
      <select
        className='block appearance-none w-full border-solid border-2 border-gray-200 font-HelveticaRoman font-normal text-[#232323] py-3 px-4 pr-8 rounded leading-normal focus:outline-none focus:bg-white focus:border-gray-500 text-[14px]'
        id='order-by'
        name='order-by'
        onChange={e => orderBySelect(e)}
      >
        <option value='' style={{ display: 'none' }}>
          {sortingArray[0]?.label}
        </option>
        {sortingArray?.map((item, index) => (
          <option
            key={item?.label || index}
            value={item?.value.replace(/\"/g, '')}
          >
            {item?.label}
          </option>
        ))}
      </select>
      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
        <svg
          className='fill-current h-5 w-5'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
        >
          <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
        </svg>
      </div>
    </div>
  );
}

PLPOrderBySelect.propTypes = {
  orderBySelect: PropTypes.func,
  sortingArray: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  )
};

PLPOrderBySelect.defaultProps = {
  orderBySelect: () => {}
};
