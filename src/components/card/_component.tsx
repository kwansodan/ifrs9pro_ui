import { CardProps } from "../../core/interfaces";

function Card({ title, value, valueClassName, parentClassName }: CardProps) {
  return (
    <>
      <div
        className={` ${parentClassName} relative w-full h-[211px] p-4 border border-gray-200 rounded-[11px] shadow-sm md:w-1/3`}
      >
        <h3 className={`text-[16px] font-medium text-[#6F6F6F]`}>{title}</h3>
        <p
          className={`${valueClassName}  text-[64px] absolute mt-2 text-3xl font-semibold text-gray-400 bottom-6`}
        >
          {value}
        </p>
      </div>
    </>
  );
}

export default Card;
