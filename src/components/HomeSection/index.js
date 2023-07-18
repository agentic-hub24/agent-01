import ArticleCard from '@components/cards/ArticleCard';

const HomeSection = ({ homePageData }) => {
  const isLiterature = homePageData?.internalTitle.includes('Literature');
  const isIntelligent = homePageData?.internalTitle.includes(
    'Intelligent Toilets'
  );
  const isBidetSeat = homePageData?.internalTitle.includes('Bidet Seats');

  return (
    <section className={`${!isIntelligent && !isBidetSeat && 'bg-[#e3e3e3]'}`}>
      <div className='grid grid-cols-1 w-full mx-auto max-w-screen-lg'>
        <div
          className={`text-center flex flex-wrap ${
            !isBidetSeat && 'mx-10 md:mx-16 lg:mx-8'
          }`}
        >
          {homePageData?.cardRows?.map(({ fields, sys }) => (
            <ArticleCard
              key={sys?.id}
              cardRows={fields?.cardItem}
              isLiterature={isLiterature}
              isIntelligent={isIntelligent}
              isBidetSeat={isBidetSeat}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
