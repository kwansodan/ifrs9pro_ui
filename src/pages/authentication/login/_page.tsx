import { useEffect, useState } from "react";
import { Images } from "../../../data/Assets";
import Button from "../../../components/button/_component";
import { useActionState } from "react";
import { UserLogin } from "../../../core/services/auth.service";
import { showToast } from "../../../core/hooks/alert";
import { cacheUserRole, cacheUserSession } from "../../../core/utility";
import { useDispatch } from "react-redux";
import { setUser } from "../../../core/stores/slices/user_slice";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [password, setPassword] = useState<boolean>(false);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleLogin = async (prevState: any, formData: FormData) => {
    setButtonLoading(true);
    console.log("prev: ", prevState);
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;
    if (!email || !password) {
      showToast("Email and password are required.", false);
      setButtonLoading(false);
      return { success: false, error: "Email and password are required." };
    }

    try {
      UserLogin(email, password)
        .then((res) => {
          setButtonLoading(false);
          if (res.status === 200) {
            const expiresInMs = res.data.expires_in * 1000;
            const expirationTime = Date.now() + expiresInMs;

            cacheUserSession(res?.data.access_token, expirationTime.toString());
            cacheUserRole(res?.data.user.role);
            dispatch(setUser({ roles: [], username: res?.data.user.role }));
            if (res?.data.user.role === "admin") window.location.reload();
            else navigate("/request-access");
          }
        })
        .catch((err) => {
          setButtonLoading(false);
          showToast(err?.response?.data.detail, false);
        });
    } catch (err) {
      setButtonLoading(false);
      showToast("Login failed. Please try again.", false);
      return { success: false, error: "Login failed. Please try again." };
    }
  };

  const [state, formAction] = useActionState(handleLogin, null);
  console.log("state: ", state);

  const passwordToggle = () => {
    setPassword(!password);
  };

  useEffect(() => {
    setIsFormValid(emailValue.trim() !== "" && passwordValue.trim() !== "");
  }, [emailValue, passwordValue]);

  return (
    <>
      <h2 className=" mt-24 text-center text-[20px] font-extrabold text-[#166E94]">
        IFRS9Pro
      </h2>
      <div className="flex items-center justify-center">
        <div className="relative bg-white px-8 py-12 rounded-xl border-[1px] border-[#F0F0F0] w-96">
          <form action={formAction}>
            <div className="absolute top-0 left-0 right-0 h-8 bg-gray-100 rounded-t-xl"></div>

            <h3 className="text-center text-[18px] font-medium text-gray-800">
              Log into your account.
            </h3>
            <div className="mt-4">
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="w-full h-[4%] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
                onChange={(e) => setEmailValue(e.target.value)}
              />
            </div>
            <div className="relative mt-4">
              <input
                type={password ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full h-[4%] text-[14px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#166E94]"
                onChange={(e) => setPasswordValue(e.target.value)}
              />
              <span
                onClick={() => passwordToggle()}
                className="absolute text-gray-500 cursor-pointer top-3 right-4"
              >
                {password ? (
                  <img className="w-5" src={Images.closedEye} />
                ) : (
                  <img className="w-5" src={Images.openEye} />
                )}
              </span>
            </div>
            <Button
              type="submit"
              className="mt-8"
              text="Login"
              disabled={!isFormValid}
              isLoading={buttonLoading}
            />
          </form>
          <small className="flex justify-center text-center">
            Don't have access?
            <span
              className="ml-2 text-blue-500 underline cursor-pointer"
              onClick={() => navigate("/request-access")}
            >
              Request access
            </span>
          </small>
        </div>
      </div>
    </>
  );
}

export default Login;
