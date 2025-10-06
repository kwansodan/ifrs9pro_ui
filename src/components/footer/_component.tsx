import React from "react";
import { Images } from "../../data/Assets";

const FooterSection: React.FC = () => {
  return (
    <footer className="mt-20">
      <div className="bg-[#9EC8DB] px-6 md:px-60 py-16 flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-lg text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] leading-tight">
            Get started <br /> from $2000
          </h2>
          <p className="mt-4 text-[#1E1E1E] text-base md:text-lg">
            Save time with built-in calculators for Expected Credit Loss (ECL)
            and local impairment.
          </p>

          <div className="flex gap-4 mt-6">
            <button className="bg-[#16638E] text-white px-5 py-2 rounded-lg text-sm font-medium">
              Book a Demo
            </button>
            <button className="border border-[#16638E] text-[#16638E] px-5 py-2 rounded-lg text-sm font-medium">
              Request a proposal
            </button>
          </div>
        </div>

        <div className="mt-10 md:mt-0">
          <img
            src={Images.footerImg}
            alt="Get Started Illustration"
            className="max-w-sm md:max-w-md"
          />
        </div>
      </div>

      <div className="bg-[#092C3B] text-white px-6 md:px-20 py-6 flex flex-col md:flex-row items-center justify-between text-[12px]">
        <span className="font-semibold">IFRS9Pro</span>
        <span className="mt-2 text-sm md:mt-0">
          © 2025 IFRS Pro. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default FooterSection;
