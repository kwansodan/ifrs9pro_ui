import { useTranslation } from "react-i18next";
import en from "../assets/images/en.jpg";
import fr from "../assets/images/fr.jpg";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const isActive = (lang: string) => i18n.language.startsWith(lang);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLanguage("en")}
        className="flex items-center gap-1"
      >
        <img src={en} alt="English" className="w-4 h-4" />

        <span
          className={`px-2 py-1 text-sm rounded ${
            isActive("en")
              ? "bg-[#166E94] text-white"
              : "text-[#166E94] hover:bg-gray-100"
          }`}
        >
          EN
        </span>
      </button>

      <button
        onClick={() => changeLanguage("fr")}
        className="flex items-center gap-1"
      >
        <img src={fr} alt="French" className="w-4 h-4" />

        <span
          className={`px-2 py-1 text-sm rounded ${
            isActive("fr")
              ? "bg-[#166E94] text-white"
              : "text-[#166E94] hover:bg-gray-100"
          }`}
        >
          FR
        </span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
