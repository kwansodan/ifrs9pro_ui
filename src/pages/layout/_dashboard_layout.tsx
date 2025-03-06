import { Images } from "../../data/Assets";
import { dashboardNavItems } from "../../data";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/button/_component";
import { Dropdown, Ripple, initTWE } from "tw-elements";
import { clearUserSession } from "../../core/utility";
import { useState } from "react";

const DashboardLayout = () => {
  initTWE({ Dropdown, Ripple });
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const pathname = useLocation();
  const navigate = useNavigate();
  const gotoHelp = () => {
    navigate("/dashboard/help");
  };
  const gotoHome = () => {
    navigate("/dashboard");
  };
  const triggerLogout = () => {
    setShowLogout(!showLogout);
  };

  return (
    <>
      <div>
        <nav className="md:px-12 flex items-center justify-between mx-auto max-w-[1689px] w-full px-6 py-4">
          <img
            onClick={gotoHome}
            src={Images.logo}
            alt="Logo"
            className="h-[24px] cursor-pointer w-[85px]"
          />

          <div className="flex space-x-6">
            {dashboardNavItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={`text-[16px] cursor-pointer ${
                  pathname.pathname === item.href
                    ? "text-[#166E94] font-medium"
                    : "text-[#6F6F6F]"
                }`}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center">
            <div className="relative" data-twe-dropdown-ref>
              <button
                className="flex items-center"
                type="button"
                id="notificationdropdownMenuButton1"
                data-twe-dropdown-toggle-ref
                aria-expanded="false"
                data-twe-ripple-init
                data-twe-ripple-color="light"
              >
                <img
                  className="w-[18px] h-[18px]"
                  src={Images.notification}
                  alt=""
                />
              </button>
              <ul
                className="absolute z-[1000] w-[20rem] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-base shadow-lg data-[twe-dropdown-show]:block"
                aria-labelledby="notificationdropdownMenuButton1"
                data-twe-dropdown-menu-ref
              >
                <li className="flex items-center justify-between px-4 py-2 text-sm font-normal text-black bg-white whitespace-nowrap dark:active:bg-neutral-800/25">
                  <div className="flex items-center">
                    <img className="mr-2" src={Images.g_file} alt="" /> New data
                    uploaded{" "}
                  </div>{" "}
                  <span className="text-xs text-gray-500">2 days ago</span>
                </li>
                <li className="flex items-center justify-between px-4 py-2 text-sm font-normal text-black bg-white whitespace-nowrap dark:active:bg-neutral-800/25">
                  <div className="flex items-center">
                    <img className="mr-2" src={Images.g_calc} alt="" /> ECL
                    calculation completed{" "}
                  </div>
                  <span className="text-xs text-gray-500">2 days ago</span>
                </li>
                <li className="flex items-center justify-between px-4 py-2 text-sm font-normal text-black bg-white whitespace-nowrap dark:active:bg-neutral-800/25">
                  <div className="flex items-center">
                    <img className="mr-2" src={Images.g_report} alt="" /> Report
                    generated{" "}
                  </div>{" "}
                  <span className="text-xs text-gray-500">2 days ago</span>
                </li>
                <li className="flex items-center justify-between px-4 py-2 text-sm font-normal text-black bg-white whitespace-nowrap dark:active:bg-neutral-800/25">
                  <div className="flex items-center">
                    <img className="mr-2" src={Images.g_report} alt="" /> Report
                    generated{" "}
                  </div>{" "}
                  <span className="text-xs text-gray-500">2 days ago</span>
                </li>
                <li className="flex items-center justify-between px-4 py-2 text-sm font-normal text-black bg-white whitespace-nowrap dark:active:bg-neutral-800/25">
                  <div className="flex items-center">
                    <img className="mr-2" src={Images.g_calc} alt="" /> ECL
                    calculation completed{" "}
                  </div>
                  <span className="text-xs text-gray-500">2 days ago</span>
                </li>
              </ul>
            </div>
            <Button
              onClick={gotoHelp}
              text="Help"
              className="!border-[1px] !border-[#6F6F6F] !w-[64px] h-[30px] !rounded-[100px] bg-white flex items-center mx-3"
            />
            <div className="relative" data-twe-dropdown-ref>
              <button onClick={triggerLogout} className="flex items-center">
                <img
                  className="w-[18px] h-[18px]"
                  src={Images.blueDot}
                  alt=""
                />
              </button>
              <ul className="absolute z-[1000] float-left m-0 min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark">
                {showLogout && (
                  <li>
                    <a
                      onClick={() => clearUserSession()}
                      className="block w-full px-4 py-2 text-sm font-normal text-black bg-white cursor-pointer whitespace-nowrap dark:active:bg-neutral-800/25"
                      data-twe-dropdown-item-ref
                    >
                      Logout
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <hr className="border-[1px] border-[#F0F0F0]" />
        <div className="mx-auto max-w-[1341px] md:px-12 w-full px-6">
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
