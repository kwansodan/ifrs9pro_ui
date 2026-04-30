import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold text-red-600">{t("404.title")}</h1>
        <p className="text-lg text-gray-700">{t("404.message")}</p>
        <Link to="/" className="mt-4 text-blue-500 hover:underline">
          {t("404.goBack")}
        </Link>
      </div>
    </>
  );
}

export default NotFound;
