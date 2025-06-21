import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
  };

  const languages = ['uz', 'en', 'ru'];
  
  return (
    <div className="flex justify-center gap-3">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => changeLanguage(lang)}
          className={clsx(
            'px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300',
            'backdrop-blur-md border border-white/10 shadow-md',
            lang === currentLang
              ? 'bg-gradient-to-r from-white/30 to-blue-300/30 text-white ring-2 ring-blue-400/40'
              : 'bg-white/10 text-white hover:bg-white/20 hover:text-blue-100'
          )}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
