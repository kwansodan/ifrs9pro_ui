import { CardProps } from "../../core/interfaces";
import { motion } from "framer-motion";

function Card({ title, value, valueClassName, parentClassName }: CardProps) {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className={` ${parentClassName} relative w-full h-[211px] p-4 border border-gray-200 rounded-[11px] shadow-sm `}
    >
      <h3 className={`text-[16px] font-medium text-[#6F6F6F]`}>{title}</h3>
      <p
        className={`${valueClassName} text-[64px] absolute mt-2 text-3xl font-semibold text-gray-400 bottom-6`}
      >
        {value}
      </p>
    </motion.div>
  );
}

export default Card;
