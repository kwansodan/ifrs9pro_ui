import React from "react";
import { Images } from "../../data/Assets";
import { useTranslation } from "react-i18next";

const FooterSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="mt-20">
      <div className="bg-[#9EC8DB] px-6 md:px-60 py-16 flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-lg text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] leading-tight">
            {t("footer.startAutomating")}
          </h2>
          <p className="mt-4 text-[#1E1E1E] text-base md:text-lg">
            {t("footer.subtitle")}
          </p>

          <div className="flex gap-4 mt-6">
            <a
              href="/create-company-account"
              className="bg-[#16638E] text-white px-5 py-2 rounded-lg text-sm font-medium"
            >
              {t("footer.createAccount")}
            </a>
            <a
              href="/request-access"
              className="border border-[#16638E] text-[#16638E] px-5 py-2 rounded-lg text-sm font-medium"
            >
              {t("footer.requestAccess")}
            </a>
          </div>
        </div>

        <div className="mt-10 md:mt-0">
          <img
            src={Images.footerImg}
            alt="IFRS9Pro impairment reporting dashboard illustration"
            className="max-w-sm md:max-w-md"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div className="bg-[#092C3B] text-white px-6 md:px-20 py-6 flex flex-col md:flex-row items-center justify-between text-[12px]">
        <span className="font-semibold">IFRS9Pro</span>
        <span className="mt-2 text-sm md:mt-0">{t("footer.copyright")}</span>
      </div>
    </footer>
  );
};

export default FooterSection;
