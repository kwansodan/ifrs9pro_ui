import FeatureSection from "../../components/feature_section/_component";
import FooterSection from "../../components/footer/_component";
import Navbar from "../../components/nav/_component";
import { Images } from "../../data/Assets";

const Homepage = () => {
  return (
    <>
      <div className="bg-gradient-to-b from-[#F7FCFF] to-[#fff]">
        <Navbar />
        <div className="w-full px-6 py-4 md:px-12">
          <section>
            <div className="text-lg text-left">
              <div className="max-w-2xl mx-auto mt-6 text-lg">
                <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
                  Automate IFRS 9 Impairment <br />
                  <span className="text-gray-900">in Minutes — Not Weeks</span>
                </h1>

                <p className="max-w-2xl mx-auto mt-6 text-[14px] text-[#6F6F6F]">
                  IFRS9Pro simplifies PD, LGD, EAD, and ECL calculations <br />{" "}
                  with audit-ready reports and zero spreadsheet errors
                </p>
              </div>

              <div className="flex justify-end mt-10">
                <img
                  src={Images.homepageImg}
                  alt="Dashboard Preview"
                  className="rounded-xl w-[1700px]"
                />
              </div>
              <div className="flex flex-col justify-center">
                <FeatureSection
                  image={Images.profileLoan}
                  imageAlt="Portfolio Loan Preview"
                  heading={
                    <>
                      Portfolio <br /> Management <br /> Made Simple
                    </>
                  }
                  description="Create and manage multiple loan portfolios with ease. Define asset types, customer segments, funding sources, and repayment methods—all in one place."
                />
                <FeatureSection
                  image={Images.seamless}
                  imageAlt="Seamless Data Import"
                  reverse={true}
                  heading={
                    <>
                      Seamless Data <br /> Import
                    </>
                  }
                  description="Easily upload your loan data with our standardized CSV templates. Import loan details, guarantees, collateral, and repayment history with drag-and-drop convenience."
                />
                <FeatureSection
                  image={Images.automated}
                  imageAlt="Automated Impairment Calculations"
                  heading={<>Automated Impairment & ECL Calculations</>}
                  description="Save time with built-in calculators for Expected Credit Loss (ECL) and local impairment. Results are presented clearly across all impairment stages."
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      <FooterSection />
    </>
  );
};

export default Homepage;
