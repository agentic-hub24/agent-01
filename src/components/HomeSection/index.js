import ArticleCard from '@components/cards/ArticleCard';

const HomeSection = ({ homePageData }) => {
  return (
    <section className='bg-[#e3e3e3]'>
      <div className='grid grid-cols-1 w-full mx-auto max-w-screen-lg'>
        <div className='text-center flex justify-center flex-wrap'>
          {homePageData?.cardRows?.map(({ fields, sys }) => (
            <ArticleCard key={sys?.id} cardRows={fields?.cardItem} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
