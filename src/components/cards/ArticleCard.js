import Link from 'next/link';
import cx from 'classnames';
import MediaItem from '@components/MediaItem/MediaItem';
import { DownloadIcon } from '../svgs';

/***
 * @param {cardRows} array
 * @param {isLiterature} boolean
 * @param {showDownload} boolean
 * @returns
 */

const ArticleCard = ({
  cardRows = [],
  isLiterature = false,
  showDownload = false,
  isIntelligent = false,
  isBidetSeat = false,
  url
}) => {
  const wrapperDivClass = cx(
    'w-[290px]',
    'relative',
    'bg-white',
    isLiterature
      ? 'mx-2.5 my-5 cursor-pointer shadow-[2px_2px_5px_0_#aaa]'
      : `mx-2.5 my-5 cursor-pointer ${
          !isIntelligent &&
          !isBidetSeat &&
          `lg:[&:nth-child(2)]:mt-12 lg:[&:nth-child(4)]:mt-[-10px] lg:[&:nth-child(6)]:mt-[-5px] 
           shadow-[2px_2px_5px_0_#aaa]`
        }`,
    isBidetSeat && 'w-[480px]'
  );

  /***
   * Purpose of creating this function is to render cards with or without link
   */
  const renderCards = fields => (
    <article>
      {console.log('fields cards===>', fields)}
      <figure>
        <MediaItem assets={fields?.mediaItem} />
      </figure>
      <h4
        className={`text-2xl p-5 text-[#333333] m-auto  cursor-pointer ${
          isBidetSeat || isIntelligent
            ? 'm-0 text-[16px] text-left font-bold font-helveticaGroup'
            : 'font-medium font-helveticaLight'
        }`}
      >
        {fields?.heading}
      </h4>
      <h5
        className={`pt-0 pr-9 pb-3 pl-9 text-[#666] font-helveticaLight ${
          (isBidetSeat || isIntelligent) && 'text-left pl-5'
        }`}
      >
        {fields?.paragraphText}
      </h5>
      {fields.cta && (
        <a
          href={fields?.cta[0]?.fields?.url}
          target='_blank'
          className='justify-left pl-5 flex w-full text-[16px] hover:no-underline font-helveticaGroup'
          rel='noreferrer'
        >
          {/* <DownloadIcon /> */}
          {fields?.cta[0]?.fields?.label}
        </a>
      )}
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
