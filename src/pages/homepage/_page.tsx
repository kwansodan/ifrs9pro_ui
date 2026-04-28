import { useTranslation } from "react-i18next";
import FeatureSection from "../../components/feature_section/_component";
import FooterSection from "../../components/footer/_component";
import Navbar from "../../components/nav/_component";
import { Images } from "../../data/Assets";

const audience = [
  "Banks",
  "Microfinance institutions",
  "SACCOs",
  "Credit unions",
  "Finance teams",
  "Risk and audit teams",
];

const outcomes = [
  "Expected credit loss calculations for IFRS 9 reporting",
  "BoG impairment calculations and staging configuration",
  "PD, LGD, EAD, and ECL workflow support",
  "Excel data import, validation, and column mapping",
  "Loan portfolio summaries, quality issue review, and approvals",
  "Audit-ready impairment reports for finance and compliance teams",
];

const faqs = [
  {
    question: "What is IFRS9Pro?",
    answer:
      "IFRS9Pro is IFRS 9 impairment automation software for lending institutions that need repeatable ECL, BoG impairment, portfolio analysis, and reporting workflows.",
  },
  {
    question: "Who is IFRS9Pro built for?",
    answer:
      "It is built for banks, microfinance institutions, SACCOs, credit unions, finance teams, credit risk teams, auditors, and compliance teams.",
  },
  {
    question: "What calculations does IFRS9Pro support?",
    answer:
      "The platform supports IFRS 9 expected credit loss workflows, PD, LGD, EAD, ECL reporting, and local BoG impairment calculations.",
  },
];

const Homepage = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="bg-gradient-to-b from-[#F7FCFF] to-[#fff]">
        <Navbar />

        <main className="w-full px-6 py-4 md:px-12">
          <section aria-labelledby="landing-heading" className="text-left">
            <div className="max-w-3xl mx-auto mt-6 text-lg">
              <p className="mb-3 text-sm font-semibold tracking-wide text-[#166E94] uppercase">
                {t("homepage.tagline")}
              </p>
              <h1
                id="landing-heading"
                className="text-4xl font-bold text-gray-900 md:text-5xl"
              >
                {t("homepage.title")}
              </h1>

              <p className="max-w-3xl mt-6 text-[15px] leading-7 text-[#4B5563]">
                {t("homepage.subtitle")}
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                <a
                  href="/create-company-account"
                  className="bg-[#166E94] text-white px-5 py-3 rounded-lg text-sm font-medium"
                >
                  {t("homepage.createAccount")}
                </a>
                <a
                  href="/request-access"
                  className="border border-[#166E94] text-[#166E94] px-5 py-3 rounded-lg text-sm font-medium"
                >
                  {t("homepage.requestAccess")}
                </a>
              </div>
            </div>

            <div className="flex justify-end mt-10">
              <img
                src={Images.homepageImg}
                alt="IFRS9Pro dashboard showing portfolio impairment analytics and reporting"
                className="rounded-xl w-full max-w-[1700px]"
              />
            </div>
          </section>

          <section
            aria-labelledby="audience-heading"
            className="max-w-6xl mx-auto mt-20"
          >
            <h2
              id="audience-heading"
              className="text-2xl font-bold text-[#1E1E1E]"
            >
              {t("homepage.audienceTitle")}
            </h2>
            <p className="max-w-3xl mt-3 text-[14px] leading-7 text-[#6F6F6F]">
              {t("homepage.audienceSubtitle")}
            </p>
            <div className="grid grid-cols-2 gap-3 mt-6 md:grid-cols-3">
              {audience.map((item) => (
                <div
                  key={item}
                  className="border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#1E1E1E] bg-white"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-col justify-center">
            <FeatureSection
              image={Images.profileLoan}
              imageAlt="IFRS9Pro loan portfolio management screen"
              heading={
                <>
                  Portfolio <br /> management <br /> made simple
                </>
              }
              description="Create and manage multiple loan portfolios. Define asset types, customer segments, funding sources, repayment methods, impairment accounts, and staging rules in one workflow."
            />
            <FeatureSection
              image={Images.seamless}
              imageAlt="IFRS9Pro Excel loan data import and column mapping workflow"
              reverse={true}
              heading={
                <>
                  Clean data import <br /> for IFRS 9 models
                </>
              }
              description="Upload customer, loan, collateral, and guarantee data with standardized Excel templates. Map uploaded columns to expected model fields before calculations begin."
            />
            <FeatureSection
              image={Images.automated}
              imageAlt="IFRS9Pro expected credit loss and impairment calculation summary"
              heading={<>Automated ECL and BoG impairment calculations</>}
              description="Run expected credit loss and local impairment calculations, review staging summaries, resolve quality issues, and produce audit-ready reports for internal and external reporting."
            />
          </div>

          <section
            aria-labelledby="outcomes-heading"
            className="max-w-6xl mx-auto my-20"
          >
            <h2
              id="outcomes-heading"
              className="text-2xl font-bold text-[#1E1E1E]"
            >
              {t("homepage.outcomesTitle")}
            </h2>
            <div className="grid gap-4 mt-6 md:grid-cols-2">
              {outcomes.map((outcome) => (
                <div
                  key={outcome}
                  className="border border-[#E5E7EB] rounded-lg p-4 bg-white text-sm text-[#4B5563]"
                >
                  {outcome}
                </div>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="faq-heading"
            className="max-w-6xl mx-auto my-20"
          >
            <h2
              id="faq-heading"
              className="text-2xl font-bold text-[#1E1E1E] mb-6"
            >
              {t("homepage.faqTitle")}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="border border-[#E5E7EB] rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-base font-semibold text-[#1E1E1E]">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#6F6F6F]">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      <FooterSection />
    </>
  );
};

export default Homepage;
