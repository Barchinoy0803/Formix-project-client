import { useTranslation } from 'react-i18next';
import { languages } from '../../constants';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lng', lng);
  };

  return (
    <div className="flex justify-center">
      <select
        value={currentLang}
        onChange={(e) => changeLanguage(e.target.value)}
        className="px-4 py-2 rounded-md text-sm font-medium bg-white text-gray-800
                   border border-gray-300 shadow-sm focus:outline-none focus:ring-2
                   focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
      >
        {languages.map((lang) => (
          <option
            key={lang.code}
            value={lang.code}
            className="text-gray-800"
          >
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
