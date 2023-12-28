/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import { FaCheck, FaRegSquare } from 'react-icons/fa6';
import Slider from 'react-slider';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { filterImageFormatter } from './helper';

const FilterItems = ({
  filterOption,
  filterType,
  filterName,
  minRange,
  maxRange,
  filterSelect,
  selectedFilter,
  selectedFilterCount
}) => {
  const filter = selectedFilter;
  const router = useRouter();
  const [isRange, setIsRange] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (isRange) {
      timeoutId = setTimeout(() => {
        setIsRange(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isRange]);

  useEffect(() => {
    router &&
      router?.query?.filterBy === filterName &&
      onClickHandler(
        filterName,
        filterOption.find(el => el?.value === router?.query?.value)?.value,
        filterOption.find(el => el?.value === router?.query?.value)?.count
      );
  }, []);

  const onClickHandler = (name, value, count) => {
    filterSelect({ [name]: value }, { [name]: count });
  };
  const [values, setValues] = useState([minRange, maxRange]);
  const handleChange = (newValues, additionalValue) => {
    setValues(newValues);
  };
  const handleMouseUp = (newValues, additionalValue) => {
    // Perform actions after mouse is released
    let maxName = `${additionalValue}Max`;
    let minName = `${additionalValue}Min`;
    filterSelect({ [minName]: newValues[0], [maxName]: newValues[1] });
    setIsRange(true);
  };

  return (
    <div className='flow-root pb-[20px]'>
      {filter?.[filterName] ? (
        <ul
          className={`m-0 mb-[10px]  outline-none ${
            filterType === 'checkbox' ? 'bg-white' : 'bg-gray-300'
          } text-gray-800 inline-block border-0 rounded-md relative text-left w-full`}
        >
          <li
            className=''
            onClick={() => {
              onClickHandler(filterName, '');
            }}
          >
            <button
              className={`m-0 mb-[10px] outline-none ${
                filterType === 'checkbox' ? 'bg-white' : 'bg-gray-300'
              } text-gray-800 inline-block border-0 rounded-md relative text-left w-full`}
            >
              {filterType === 'checkbox' && (
                <div className='float-left mr-[10px] mt-[10px] text-base leading-normal font-normal shadow-none font-helvaticaFont'>
                  <span className='inline float-left pt-1 mr-3 h-[29px] w-[29px] rounded-sm bg-[#f0f0f0] '>
                    <FaCheck size={20} className='m-auto' />
                  </span>
                  <span className='inline float-left'>
                    {filter?.[filterName]}
                  </span>
                </div>
              )}
              {filterType === 'image' && (
                <>
                  <span className='block float-left max-w-[17px] h-13 mr-[10px] mt-[15px] ml-[10px] '>
                    <img
                      className=''
                      src={filterImageFormatter(filter?.[filterName])}
                      alt=''
                      title={filterOption[0]?.name}
                    />
                  </span>
                  <span className='inline-block float-left text-[12px] font-semibold mr-[10px] mt-[15px]'>
                    {filterOption[0]?.name}
                  </span>
                </>
              )}
              {filterType === 'list' && (
                <span className='block float-left text-base leading-normal font-normal shadow-none font-helvaticaFont mr-[10px] mt-[10px] ml-[10px] '>
                  {filter?.[filterName]}
                </span>
              )}

              <span className='float-left  mr-[10px] mt-[10px]  text-base leading-normal font-normal text-gray-600'>
                ({selectedFilterCount?.[filterName]})
              </span>
              <span className='absolute mt-[10px] right-4 text-gray-400 font-normal text-base'>
                x
              </span>
            </button>
          </li>
        </ul>
      ) : (
        <>
          {filterType === 'checkbox' &&
            filterOption.map((data, index) => {
              return (
                <ul key={data.value || index} style={{ listStyle: 'none' }}>
                  <li className='cursor-pointer'>
                    {/* <input
                      type='checkbox'
                      onChange={() =>
                        onClickHandler(filterName, data.value, data.count)
                      }
                    /> */}
                    <div
                      onClick={() =>
                        onClickHandler(filterName, data.value, data.count)
                      }
                      className='flex'
                    >
                      <span className='flex'>
                        <FaRegSquare size={23} />
                      </span>
                      <span className='flex pl-3'>{data.value}</span>
                      <span className='flex ml-[5px]'>({data.count})</span>
                    </div>
                  </li>
                </ul>
              );
            })}
          {filterType === 'image' &&
            filterOption.map((data, index) => {
              return (
                <ul key={data.name || index} className=''>
                  <li className='block float-left mt-[10px] mb-[5px] m-[1px] mr-[7px] cursor-pointer'>
                    <img
                      key={index}
                      title={`${data.name} - (${data.count})`}
                      src={filterImageFormatter(data.value)}
                      onClick={() =>
                        onClickHandler(filterName, data.value, data.count)
                      }
                    />
                  </li>
                </ul>
              );
            })}
          {filterType === 'list' &&
            filterOption.map((data, index) => {
              return (
                <ul key={index}>
                  <li
                    className='cursor-pointer'
                    onClick={() => {
                      onClickHandler(filterName, data.value, data.count);
                    }}
                  >
                    <span className='inline-block pt-[10px] pb-[10px]'>
                      {data.value}
                    </span>
                    <span className='text-gray-600 text-base ml-[5px]'>
                      ({data.count})
                    </span>
                  </li>
                </ul>
              );
            })}
          {filterType === 'range' && (
            <div>
              {isRange && (
                <ul className='m-0 mb-[10px]  outline-none bg-gray-300 text-gray-800 inline-block border-0 rounded-md relative text-left w-full'>
                  <li
                    className=''
                    onClick={() => {
                      onClickHandler(filterName, '');
                    }}
                  >
                    <button className='m-0 mb-[10px] outline-none bg-gray-300 text-gray-800 inline-block border-0 rounded-md relative text-left w-full'>
                      {' '}
                      <span className='block float-left max-w-[13px] h-13 mr-[10px] mt-[10px] ml-[10px] '>
                        {values[0]}
                      </span>
                      <span className='float-left  mr-[10px] mt-[10px] ml-[15px] text-base leading-normal font-normal text-gray-600'>
                        -
                      </span>
                      <span className='float-left  mr-[10px] mt-[10px]  text-base leading-normal font-normal text-gray-600'>
                        {values[1]}
                      </span>
                      <span className='absolute mt-[10px] right-4 text-gray-400 font-normal text-base'>
                        x
                      </span>
                    </button>
                  </li>
                </ul>
              )}
              <div
                className='font-bold text-base leading-normal font-helvaticaFont'
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <div>
                  <span
                    onChange={e =>
                      handleChange([
                        +e.target.value,
                        filter?.[`${filterName}Max`]
                          ? filter?.[`${filterName}Max`]
                          : values[1]
                      ])
                    }
                  >
                    {filter?.[`${filterName}Min`]
                      ? filter?.[`${filterName}Min`]
                      : values[0]}
                    {'mm'}
                  </span>
                </div>
                <div>
                  <span
                    onChange={e =>
                      handleChange([
                        filter?.[`${filterName}Min`]
                          ? filter?.[`${filterName}Min`]
                          : values[0],
                        +e.target.value
                      ])
                    }
                  >
                    {filter?.[`${filterName}Max`]
                      ? filter?.[`${filterName}Max`]
                      : values[1]}
                    {'mm'}
                  </span>
                </div>
              </div>
              <Slider
                value={
                  filter?.[`${filterName}Min`]
                    ? [
                        filter?.[`${filterName}Min`],
                        filter?.[`${filterName}Max`]
                      ]
                    : values
                }
                onChange={newValues => handleChange(newValues, filterName)}
                onAfterChange={newValues =>
                  handleMouseUp(newValues, filterName)
                }
                min={minRange}
                max={maxRange}
                renderThumb={props => (
                  <div className='custom-thumb' {...props}>
                    <div className='custom-thumb-before'></div>
                    <div className='custom-thumb-after'></div>
                  </div>
                )}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

FilterItems.propTypes = {
  filterOption: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      name: PropTypes.string,
      count: PropTypes.number
    })
  ).isRequired,
  filterType: PropTypes.oneOf(['checkbox', 'image', 'list', 'range'])
    .isRequired,
  filterName: PropTypes.string.isRequired,
  minRange: PropTypes.number,
  maxRange: PropTypes.number,
  filterSelect: PropTypes.func.isRequired,
  selectedFilter: PropTypes.object.isRequired,
  selectedFilterCount: PropTypes.object.isRequired
};

export default FilterItems;
