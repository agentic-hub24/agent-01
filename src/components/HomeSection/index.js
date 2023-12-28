import PropTypes from 'prop-types';
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
  const isFreeStandingBath = homePageData?.internalTitle.includes(
    'Homepage card Landing Page 2'
  );
  return (
    <section
      className={`${
        !isIntelligent &&
        !isBidetSeat &&
        !isWaterFilterationEN &&
        !isWaterFilterationES &&
        !isFreeStandingBath &&
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
              isFreeStandingBath={isFreeStandingBath}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

HomeSection.propTypes = {
  homePageData: PropTypes.shape({
    internalTitle: PropTypes.string,
    heading: PropTypes.string,
    cardRows: PropTypes.arrayOf(
      PropTypes.shape({
        fields: PropTypes.shape({
          cardItem: PropTypes.array
        }),
        sys: PropTypes.shape({
          id: PropTypes.string
        })
      })
    )
  })
};

export default HomeSection;
