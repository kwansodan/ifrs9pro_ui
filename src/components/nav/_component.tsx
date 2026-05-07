import { useLocation, useNavigate } from "react-router-dom";
import { Images } from "../../data/Assets";
import Button from "../button/_component";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const gotoHome = () => {
    navigate("/");
  };

  const isLoginPage = currentPath === "/login";
  const isSignupPage = currentPath === "/create-company-account";
  const isRequestAccessPage = currentPath === "/request-access";

  return (
    <>
      <nav
        aria-label="Primary navigation"
        className="md:px-12 flex items-center justify-between mx-auto max-w-[1189px] w-full px-6 py-4"
      >
        <button
          type="button"
          onClick={gotoHome}
          className="flex items-center"
          aria-label="Go to IFRS9Pro home"
        >
          <img
            src={Images.logo}
            alt="IFRS9Pro logo"
            className="h-[24px] cursor-pointer w-[85px]"
          />
        </button>
        <div className="mx-3">
          <LanguageSwitcher />
        </div>
        <div className="flex items-center">
          {!isLoginPage && (
            <Button
              text={t("nav.login")}
              onClick={() => navigate("/login")}
              className="!border-[1px] !border-[#166E94] !text-[#166E94] text-xs !w-full h-[30px] !rounded-[100px] bg-white mx-3"
            />
          )}

          {!isSignupPage && (
            <Button
              onClick={() => navigate("/create-company-account")}
              text={t("nav.signup")}
              className="!border-[1px] text-xs !w-full h-[30px] text-white !rounded-[100px] bg-[#166E94] mx-3"
            />
          )}

          {!isRequestAccessPage && (
            <Button
              onClick={() => navigate("/request-access")}
              text={t("nav.requestAccess")}
              className="!border-[1px] text-xs !w-full h-[30px] text-white !rounded-[100px] bg-[#166E94] mx-3"
            />
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
