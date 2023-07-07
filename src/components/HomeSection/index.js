import ArticleCard from '@components/cards/ArticleCard';

const HomeSection = ({ homePageData }) => {
  const isLiterature = homePageData?.internalTitle.includes('Literature');
  return (
    <section className='bg-[#e3e3e3]'>
      <div className='grid grid-cols-1 w-full mx-auto max-w-screen-lg'>
        <div className='text-center flex mx-10 md:mx-16 lg:mx-8 flex-wrap'>
          {homePageData?.cardRows?.map(({ fields, sys }) => (
            <ArticleCard
              key={sys?.id}
              cardRows={fields?.cardItem}
              isLiterature={isLiterature}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
