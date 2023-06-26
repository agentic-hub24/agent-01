import { useState } from 'react';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi2';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';
import classNames from 'classnames';

const CarouselComponent = ({ carouselItem }) => {
  const [clicked, setClicked] = useState(null);
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
              <div>
                <img
                  src={
                    'https:' +
                    item?.fields?.mediaItem?.[0]?.fields.asset.fields.file.url
                  }
                  className='w-12 text-black'
                  alt={
                    'https:' +
                    item?.fields?.mediaItem?.[0]?.fields.asset.fields.altText
                  }
                />
              </div>
            </Link>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
