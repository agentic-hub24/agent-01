import ArticleCard from '@components/cards/ArticleCard';

const HomeSection = ({ homePageData }) => {
  const isLiterature = homePageData?.internalTitle.includes('Literature');
  const isCadSymbol = homePageData?.internalTitle.includes('CAD Symbols');
  const isIntelligent = homePageData?.internalTitle.includes(
    'Intelligent Toilets'
  );
  const isBidetSeat = homePageData?.internalTitle.includes('Bidet Seats');
  const isWaterFilterationES = homePageData?.internalTitle.includes(
    'Water Filtration - cards es'
  );
  const isWaterFilterationEN =
    homePageData?.internalTitle.includes('Water Filtration');

  return (
    <section
      className={`${
        !isIntelligent &&
        !isBidetSeat &&
        !isWaterFilterationEN &&
        !isWaterFilterationES &&
        'bg-[#e3e3e3]'
      }`}
    >
      <div className='grid grid-cols-1 w-full mx-auto max-w-screen-lg'>
        {homePageData?.heading && (
          <h1 className='mx-10 md:mx-16 lg:mx-10 pt-8 text-[2em] text-[#000]'>
            {homePageData?.heading}
          </h1>
        )}
        <div
          className={`justify-center md:justify-start flex flex-wrap ${
            !isBidetSeat &&
            !isWaterFilterationES &&
            'mx-0 lg:mx-10 md:mx-16 lg:mx-8'
          }`}
        >
          {homePageData?.cardRows?.map(({ fields, sys }) => (
            <ArticleCard
              key={sys?.id}
              cardRows={fields?.cardItem}
              isLiterature={isLiterature || isCadSymbol}
              isCadSymbol={isCadSymbol}
              isIntelligent={isIntelligent}
              isBidetSeat={isBidetSeat}
              isWaterFilterationES={isWaterFilterationES}
              isWaterFilterationEN={isWaterFilterationEN}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
