import { Images } from "../../data/Assets";
import { dashboardNavItems } from "../../data";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/button/_component";
import { Dropdown, Ripple, initTWE } from "tw-elements";
import { clearUserSession } from "../../core/utility";
import { useActionState, useState } from "react";
import { Modal } from "../../components/modal/_component";
import { SendHelp } from "../../core/services/feedback.service";
import { showToast } from "../../core/hooks/alert";
import { useGetNotifications } from "../../core/hooks/feedback";
import { useDashboardNav } from "../../core/hooks/dashboardNav";

const DashboardLayout = () => {
  const navItems = useDashboardNav();
  const { notificationsQuery } = useGetNotifications();
  const [openHelpModal, setOpenHelpModal] = useState<boolean>(false);
  initTWE({ Dropdown, Ripple });
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const pathname = useLocation();
  const navigate = useNavigate();

  const gotoHome = () => {
    navigate("/dashboard");
  };
  const triggerLogout = () => {
    setShowLogout(!showLogout);
  };

  const submit = async (prevState: any, formData: FormData) => {
    setButtonLoading(true);
    console.log("prev: ", prevState);
    const description = formData.get("description") as string | null;
    if (!description) {
      showToast("Please enter your ask", false);
      setButtonLoading(false);
      return;
    }

    const payload = { description };
    try {
      SendHelp(payload)
        .then((res) => {
          showToast(res.data.message ?? "Operation successful", true);
          setButtonLoading(false);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          setButtonLoading(false);
          showToast(
            err?.response?.data.detail[0].msg ??
              "An error occurred, please try again",
            false
          );
        });
    } catch {
      setButtonLoading(false);
      showToast("An error occurred. Please try again.", false);
      return;
    }
  };

  const [state, formAction] = useActionState(submit, null);
  console.log("state: ", state);
  const notificationsData =
    notificationsQuery &&
    notificationsQuery.data &&
    notificationsQuery.data.data;
  return (
    <>
      <Modal
        open={openHelpModal}
        close={() => setOpenHelpModal(false)}
        modalHeader="Get help"
      >
        <div className="p-8 bg-white rounded-[20px]">
          <hr className="my-3" />
          <form action={formAction}>
            <div className="p-8 ">
              <div className="mt-3">
                <textarea
                  name="description"
                  placeholder="Ask a question"
                  className="w-[30rem] h-[100px] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
                />
              </div>
            </div>
            <hr />
            <div className="flex justify-end p-2">
              <div
                onClick={() => setOpenHelpModal(false)}
                className="flex items-center justify-center cursor-pointer bg-white !py-0 mr-3 border-[1px] border-[#6F6F6F] font-normal mt-3 text-[#6F6F6F] text-[12px] !rounded-[10px] !w-[90px] "
              >
                Cancel
              </div>

              <Button
                text="Submit"
                isLoading={buttonLoading}
                className="bg-[#166E94] font-normal mt-3 text-white text-[12px] !rounded-[10px] !w-[90px] "
              />
            </div>
          </form>
        </div>
      </Modal>
      <div>
        <nav className="md:px-12 flex items-center justify-between mx-auto max-w-[1689px] w-full px-6 py-4">
          <img
            onClick={gotoHome}
            src={Images.logo}
            alt="Logo"
            className="h-[24px] cursor-pointer w-[85px]"
          />

          <div className="flex space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={`text-[14px] cursor-pointer ${
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
                {notificationsData &&
                  notificationsData?.map((item: any, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between px-4 py-2 text-sm font-normal text-black bg-white whitespace-nowrap dark:active:bg-neutral-800/25"
                    >
                      <div className="flex items-center">
                        <img className="mr-2" src={Images.g_file} alt="" />{" "}
                        {item?.text}
                      </div>{" "}
                      <span className="text-xs text-gray-500">
                        {item?.time_ago}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
            <Button
              onClick={() => setOpenHelpModal(true)}
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
