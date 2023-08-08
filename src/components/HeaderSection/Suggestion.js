const Suggestion = ({ searchTerm, list, searchOnSuggestion }) => {
  if (!list?.suggestionsData?.length) {
    return null;
  }
  return (
    <div className='w-full absolute top-10 max-h-[300px] overflow-auto bg-[#f5f5f5]'>
      <ul>
        {list?.suggestionsData?.map(item => (
          <li
            key={item}
            className='p-4 bg-[#f5f5f5] hover:bg-[#6c89ad] hover:text-[#fff] text-[12px] cursor-pointer'
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
