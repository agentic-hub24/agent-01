const Suggestion = ({ searchTerm, list, searchOnSuggestion }) => {
  if (!list?.suggestionsData?.length) {
    return null;
  }
  return (
    <div className='w-full absolute top-10 h-[300px] overflow-auto'>
      <ul>
        {list?.suggestionsData?.map(item => (
          <li
            key={item}
            className='p-4 bg-[#e5e5e5] hover:bg-[#6c89ad] hover:text-[#fff] text-[12px] cursor-pointer'
            onClick={() => searchOnSuggestion(item, list?.pageRedirection)}
          >
            <span
              dangerouslySetInnerHTML={{
                __html: highlightTerm(item, searchTerm)
              }}
            ></span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const highlightTerm = (match, searchTerm) => {
  const regex = new RegExp(searchTerm, 'gi');
  return match.replace(regex, '<mark>$&</mark>');
};

export default Suggestion;
