import React from "react";

interface FeatureSectionProps {
  image: string;
  imageAlt: string;
  heading: string | React.ReactNode;
  description: string;
  reverse?: boolean;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  image,
  imageAlt,
  heading,
  description,
  reverse = false,
}) => {
  return (
    <section className="flex justify-center my-24">
      <div
        className={`flex flex-col items-center gap-12 md:flex-row ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        <img
          src={image}
          alt={imageAlt}
          className="w-full max-w-[724px] rounded-xl"
          loading="lazy"
          decoding="async"
        />

        <div className="max-w-md p-12 text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1E1E1E] leading-tight">
            {heading}
          </h2>

          <p className="mt-6 text-[#6F6F6F] text-[14px] leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
