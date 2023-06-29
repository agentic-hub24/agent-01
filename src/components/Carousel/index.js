import { useState } from 'react';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi2';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';
import classNames from 'classnames';

const CarouselComponent = ({ carouselItem, showBanner }) => {
  const [clicked, setClicked] = useState(null);
  const [count, setCount] = useState(0);
  return (
    <div className='w-full cursor-pointer'>
      <Carousel
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        swipeable={true}
        showStatus={false}
        interval={5000}
        showIndicators={carouselItem?.length > 1 ? true : false}
        dynamicHeight={true}
        onChange={id => setCount(id)}
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <button
              type='button'
              onClick={() => {
                onClickHandler();
                setClicked(true);
              }}
              className={classNames('dp-left-arrow', { clicked: clicked })}
            >
              <HiChevronLeft size={55} />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasPrev) =>
          hasPrev && (
            <button
              type='button'
              onClick={() => {
                onClickHandler();
                setClicked(true);
              }}
              className={classNames('dp-right-arrow', { clicked: clicked })}
            >
              <HiChevronRight size={55} />
            </button>
          )
        }
      >
        {carouselItem?.map((item, index) => {
          return (
            <Link href={item?.fields?.url || '#'} key={index} target='_blank'>
              <div className='lg:relative lg:inline-block'>
                <img
                  src={
                    'https:' +
                    item?.fields?.mediaItem?.[0]?.fields.asset.fields.file.url
                  }
                  className='w-12 text-black'
                  alt={item?.fields?.mediaItem?.[0]?.fields.altText}
                />
                {/* carousel banner desktop */}
                {showBanner && (
                  <div className='banner-text lg:block hidden font-HelveticaRoman leading-tight'>
                    <h1>
                      {item?.fields?.mediaItem?.[0]?.fields.asset.fields.title}
                    </h1>
                    <p>
                      {
                        item?.fields?.mediaItem?.[0]?.fields.asset.fields
                          .description
                      }
                    </p>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </Carousel>
      {/* Carousel banner mobile */}
      {showBanner && (
        <div className='bg-[#e3e3e3] flex flex-col items-center text-[#000] lg:hidden font-HelveticaRoman leading-tight p-[20px]'>
          <h1 className='text-[34px] text-center'>
            {
              carouselItem[count]?.fields?.mediaItem?.[0]?.fields.asset.fields
                .title
            }
          </h1>
          <p className='mt-[15px] text-[21px] text-center'>
            {
              carouselItem[count]?.fields?.mediaItem?.[0]?.fields.asset.fields
                .description
            }
          </p>
          <Link href={carouselItem[count]?.fields?.url || '#'} target='_blank'>
            <button className='bg-[#fff] px-4 py-3 text-[12px] rounded-md uppercase shadow-lg mt-[15px] font-HelveticaBold'>
              Browse
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CarouselComponent;

CarouselComponent.defaultProps = {
  showBanner: true,
  carouselItem: []
};
