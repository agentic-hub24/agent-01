import ArticleCard from '@components/cards/ArticleCard';

const HomeSection = ({ homePageData }) => {
  const isLiterature = homePageData?.internalTitle.includes('Literature');
  const isCadSymbol = homePageData?.internalTitle.includes('CAD Symbols');
  return (
    <section className='bg-[#e3e3e3]'>
      <div className='grid grid-cols-1 w-full mx-auto max-w-screen-lg'>
        {homePageData?.heading && (
          <h1 className='mx-10 md:mx-16 lg:mx-10 pt-8 text-[2em] text-[#000]'>
            {homePageData?.heading}
          </h1>
        )}
        <div className='text-center flex mx-10 md:mx-16 lg:mx-8 flex-wrap'>
          {homePageData?.cardRows?.map(({ fields, sys }) => (
            <ArticleCard
              key={sys?.id}
              cardRows={fields?.cardItem}
              isLiterature={isLiterature || isCadSymbol}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
