import Link from 'next/link';
import cx from 'classnames';
import MediaItem from '@components/MediaItem/MediaItem';

/***
 * @param {cardRows} array
 * @param {isLiterature} boolean
 * @returns
 */

const ArticleCard = ({
  cardRows = [],
  isLiterature = false,
  isIntelligent = false,
  isBidetSeat = false,
  isCadSymbol = false,
  isWaterFilterationES = false,
  isWaterFilterationEN = false,
  isFreeStandingBath = false
}) => {
  const wrapperDivClass = cx(
    'w-[290px]',
    'relative',
    'bg-white',
    isLiterature
      ? 'mx-2.5 my-5 cursor-pointer shadow-[2px_2px_5px_0_#aaa]'
      : `mx-2.5 my-5 cursor-pointer ${
          !isIntelligent &&
          !isWaterFilterationES &&
          !isWaterFilterationEN &&
          !isBidetSeat &&
          !isFreeStandingBath &&
          `lg:[&:nth-child(2)]:mt-12 lg:[&:nth-child(4)]:mt-[-10px] lg:[&:nth-child(6)]:mt-[-5px] 
           shadow-[2px_2px_5px_0_#aaa]`
        }`,
    (isBidetSeat || isWaterFilterationES) && 'w-[480px]'
  );

  /***
   * Purpose of creating this function is to render cards with or without link
   */
  const renderCards = fields => (
    <article className='pb-4'>
      <figure>
        <MediaItem assets={fields?.mediaItem} />
      </figure>
      <h4
        className={`text-2xl p-5 text-[#333333] m-auto  cursor-pointer ${
          isBidetSeat ||
          isIntelligent ||
          isWaterFilterationES ||
          isWaterFilterationEN ||
          isFreeStandingBath
            ? 'm-0 text-[16px] text-left font-bold font-helveticaGroup'
            : 'font-medium font-helveticaLight text-center'
        }`}
      >
        {fields?.heading}
      </h4>
      <h5
        className={`pt-0 pr-9 pb-3 text-[#666] font-helveticaLight ${
          isBidetSeat ||
          isIntelligent ||
          isWaterFilterationES ||
          isWaterFilterationEN ||
          isFreeStandingBath
            ? 'text-left pl-5'
            : 'text-center pl-9'
        }`}
      >
        {fields?.paragraphText}
      </h5>
      {fields?.cta &&
        fields?.cta?.map(({ fields, sys }, index) => (
          <Link key={sys?.id} href={fields?.url}>
            <a
              target={fields?.openerType !== 'Current Window' ? '_blank' : ''}
              className={`flex w-full text-[16px] ${
                isCadSymbol
                  ? 'helveticaLight justify-center'
                  : 'font-helveticaGroup justify-left hover:no-underline pl-5'
              }`}
              rel='noreferrer'
            >
              {fields?.label}
            </a>
          </Link>
        ))}
    </article>
  );
  return (
    <>
      {cardRows?.map(({ fields, sys }) => (
        <div key={sys?.id} className={wrapperDivClass}>
          {fields?.url ? (
            <Link href={fields?.url ? fields.url : ''}>
              {renderCards(fields)}
            </Link>
          ) : (
            renderCards(fields)
          )}
        </div>
      ))}
    </>
  );
};

export default ArticleCard;
