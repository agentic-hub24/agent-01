const SearchNotFound = ({ requestBody }) => {
  return (
    <>
      <div className='text-center bg-gray-200 pt-[120px] pb-[50px]'>
        <div className=' text-black'>
          <h1 className='font-sans font-light text-5xl leading-1'>
            Buscar resultados para &quot;{requestBody?.search}&quot;
          </h1>
          <p className='my-5 font-sans font-bold text-xl leading-none'>
            0 &nbsp;Procurar resultados
          </p>
        </div>
      </div>
      <section className='text-xs w-full mx-auto bg-white text-gray-800 overflow-auto relative z-0'>
        <div className='font-sans font-light text-xl leading-5 font-medium relative float-left w-full min-h-1px mb-[20px] pt-[100px] px-10'>
          <h3>Não encontramos nenhum resultado para a sua pesquisa</h3>
          <div className='mt-[20px] mb-[10px] text-xl'>
            <h3>DICAS DE BUSCA</h3>
            <ul className='text-base mb-10 list-disc ml-[50px]'>
              <li>Verifique novamente a ortografia</li>
              <li>Experimente palavras-chave diferentes</li>
              <li>Tente palavras-chave mais genéricas</li>
              <li>Tente menos palavras-chave</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchNotFound;
