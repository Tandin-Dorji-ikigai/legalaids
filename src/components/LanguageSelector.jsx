import { useTranslation } from "react-i18next";
import './LanguageSelector.css';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    const selectedLanguage = e.target.value; // Get the selected value from the dropdown
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('i18nextLng', selectedLanguage); // Save the selected language to localStorage
  };

  return (
    <div className="dropdown-container">
      <select
        value={i18n.language} 
        onChange={handleChange}
        className="language-dropdown"
      >
        <option value="en">English</option>
        <option value="dz">Dzongkha</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
