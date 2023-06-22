import CarouselComponent from '@components/Carousel';
import ArticleCard from '@components/cards/ArticleCard';

const HomeSection = ({ homePageData }) => {
  return (
    <>
      <section>
        <div className='grid grid-cols-1 max-w-full'>
          {/* <div className='justify-self-center'>
            <CarouselComponent carouselItem={homePageData?.carouselItem} />
          </div> */}
          <div className='bg-[#e3e3e3] text-center flex justify-center flex-wrap'>
            <ArticleCard
              cardRows={homePageData?.cardRows?.[0]?.fields?.cardItem}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeSection;
