import { useEffect, useState } from 'react';

export const UseLocalStorage = () => {
  const [isLocalStorage, setIsLocalStorage] = useState([]);

  useEffect(() => {
    function checkLocalStorage() {
      const item = JSON.parse(localStorage.getItem('theArray'));
      if (item && item.length) {
        setIsLocalStorage(item);
      } else {
        setIsLocalStorage([]);
      }
    }
    setTimeout(() => checkLocalStorage(), 1000);
    window.addEventListener('storage', checkLocalStorage);
    // return () => {
    //   window.removeEventListener('storage', checkLocalStorage);
    // };
  }, []);

  return isLocalStorage;
};
