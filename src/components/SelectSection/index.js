export default function SelectSection({
  selectOptions,
  label,
  onChange,
  selectValue,
  disabled
}) {
  return (
    <div className='md:flex md:items-center mb-6'>
      <div className='md:w-1/3'>
        <label
          className='font-HelveticaRoman block font-bold mb-1 md:mb-0 pr-4 text-[#232323] text-[14px] mb-[5px]'
          htmlFor='select-state'
        >
          {label}
        </label>
      </div>
      <div className='md:w-2/3 relative'>
        <select
          className='font-HelveticaRoman block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 disabled:cursor-not-allowed text-[14px]'
          id='select-state'
          name='select-state'
          onChange={onChange}
          value={selectValue}
          disabled={disabled}
        >
          {selectOptions?.map((item, index) => (
            <option key={index} className='font-HelveticaRoman text-[14px]'>
              {item}
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
    </div>
  );
}

SelectSection.defaultProps = {
  selectOptions: [],
  label: '',
  onChange: () => {},
  selectValue: '',
  disabled: false
};
