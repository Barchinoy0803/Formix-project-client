import { Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
  };

  return (
    <div className='px-3 py-2 flex gap-[10px]'>
      <button className='px-4 py-2 bg-white text-black rounded-[8px] cursor-pointer' onClick={() => changeLanguage('uz')}>UZ</button>
      <button className='px-4 py-2 bg-white text-black rounded-[8px] cursor-pointer' onClick={() => changeLanguage('en')}>EN</button>
      <button className='px-4 py-2 bg-white text-black rounded-[8px] cursor-pointer' onClick={() => changeLanguage('ru')}>RU</button>
    </div>
  );
}

export default LanguageSwitcher;