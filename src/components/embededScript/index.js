import { useEffect } from 'react';

export default function EmbededScript({ fields, pageHeading }) {
  const { dataPolicy, elementId, scriptId, scriptUrl } = fields;
  useEffect(() => {
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.setAttribute('data-policy', dataPolicy);
    script.setAttribute('id', scriptId);
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  return (
    <>
      <div className='max-w-screen-lg mx-auto md:px-8 md:my-12 md:pb-3 py-[30px] px-[20px]'>
        <h2 className='mb-[70px] md:text-5xl text-2xl font-medium text-black'>
          {pageHeading}
        </h2>
        <div
          className='text-[15px] text-black font-normal font-helveticaGroup'
          id='embed'
        >
          <div id={elementId} className='[&_ul]:mb-4'></div>
        </div>
      </div>
    </>
  );
}

EmbededScript.defaultProps = {
  fields: {
    dataPolicy: '',
    elementId: '',
    scriptId: '',
    scriptUrl: ''
  },
  pageHeading: ''
};
