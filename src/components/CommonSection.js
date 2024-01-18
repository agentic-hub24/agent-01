import PropTypes from 'prop-types';

export const commonSectionSearch = isEnglish => (
  <section className='text-xs w-full mx-auto bg-white text-gray-800 overflow-auto relative z-0'>
    <div className='font-sans font-light text-xl leading-5 font-medium relative float-left w-full min-h-1px mb-[20px] pt-[100px] px-10'>
      <h3>
        {isEnglish
          ? 'We did not find any results for your search.'
          : 'No encontramos ningún resultado para su búsqueda.'}
      </h3>
      <div className='mt-[20px] mb-[10px] text-xl'>
        <h3>{isEnglish ? 'SEARCH TIPS:' : 'CONSEJOS DE BÚSQUEDA:'}</h3>
        <ul className='text-base mb-10 list-disc ml-[50px]'>
          <li>
            {isEnglish
              ? 'Check spelling again.'
              : 'Revisar ortografía nuevamente.'}
          </li>
          <li>
            {isEnglish
              ? 'Try different keywords.'
              : 'Pruebe diferentes palabras clave.'}
          </li>
          <li>
            {isEnglish
              ? 'Try more generic keywords.'
              : 'Pruebe palabras clave más genéricas.'}
          </li>
          <li>
            {isEnglish
              ? 'Try fewer keywords.'
              : 'Pruebe con menos palabras clave.'}
          </li>
        </ul>
      </div>
    </div>
  </section>
);

export const SocialButton = ({
  href,
  onClick,
  className,
  title,
  icon,
  label
}) => (
  <li className='relative'>
    <button
      target='popup'
      data-href={href}
      onClick={onClick}
      rel='noreferrer'
      className={className}
      title={title}
    >
      <div className='flex inline-flex'>
        <div className='flex w-[20px] h-[20px]'>{icon}</div>
        <div className='flex p-2 text-[#232323] font-HelveticaRoman text-[14px]'>
          {label}
        </div>
      </div>
    </button>
  </li>
);
SocialButton.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.node,
  label: PropTypes.string
};

export async function fetchContentfulCommonEntries(lc, client) {
  const footerNavigationData = await client.getEntries({
    content_type: 'footer',
    'metadata.tags.sys.id[in]': 'kohlerLatam',
    include: 7,
    locale: lc
  });
  const headerNavigationData = await client.getEntries({
    content_type: 'header',
    'metadata.tags.sys.id[in]': 'kohlerLatam',
    include: 7,
    locale: lc
  });
  const world = await client.getEntries({
    content_type: 'worldwideMenu',
    include: 7,
    locale: lc
  });

  return {
    footerNavigationData,
    headerNavigationData,
    world
  };
}
