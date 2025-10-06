import { useNavigate } from "react-router-dom";
import { Images } from "../../data/Assets";
import Button from "../button/_component";

const Navbar = () => {
  const navigate = useNavigate();
  const gotoHome = () => {
    navigate("/dashboard");
  };

  4;
  return (
    <>
      <nav className="md:px-12 flex items-center justify-between mx-auto max-w-[1189px] w-full px-6 py-4">
        <img
          onClick={gotoHome}
          src={Images.logo}
          alt="Logo"
          className="h-[24px] cursor-pointer w-[85px]"
        />

        <div className="flex items-center">
          <Button
            text="Request a proposal"
            className="!border-[1px] !border-[#166E94] !text-[#166E94] text-xs !w-full h-[30px] !rounded-[100px] bg-white mx-3"
          />
          <Button
            text="Book a demo"
            className="!border-[1px] text-xs !w-full h-[30px] text-white !rounded-[100px] bg-[#166E94] mx-3"
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
