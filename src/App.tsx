import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState, Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import DashboardLayout from "./pages/layout/_dashboard_layout";
import NotFound from "./components/404/_component";
import PageLoader from "./components/page_loader/_component";

import { IAppState } from "./core/interfaces";
import { getUserSession } from "./core/utility";
import { RootState } from "./core/stores";

const Homepage = lazy(() => import("./pages/homepage/_page"));
const Login = lazy(() => import("./pages/authentication/login/_page"));
const RequestAccess = lazy(
  () => import("./pages/authentication/access/request_access"),
);
const ForgotPassword = lazy(
  () => import("./pages/authentication/forgot_password/forgot_password"),
);
const ResetPassword = lazy(
  () => import("./pages/authentication/forgot_password/set-password"),
);
const Verification = lazy(
  () => import("./pages/authentication/verification/_page"),
);
const AdminVerification = lazy(
  () => import("./pages/authentication/verification/admin_verification"),
);
const AdminRequest = lazy(
  () => import("./pages/authentication/access/admin_request"),
);
const ExpiredLink = lazy(
  () => import("./pages/authentication/verification/expired_link"),
);
const PasswordChange = lazy(() => import("./pages/passwords/_page"));
const CreateCompanyAccount = lazy(() => import("./pages/signup/signup"));
const BillingSetup = lazy(() => import("./pages/billing/billing_setup"));
const BillingCallback = lazy(() => import("./pages/billing/billing_callback"));
const DPA = lazy(() => import("./pages/authentication/access/dpa"));
const TNCS = lazy(() => import("./pages/authentication/access/tncs"));

const Home = lazy(() => import("./pages/dashboard/home/_page"));
const Porfolio = lazy(() => import("./pages/portfolio/_page"));
const PortfolioDetails = lazy(
  () => import("./pages/portfolio/portfolio_details"),
);
const EditPortfolio = lazy(() => import("./pages/portfolio/edit_portfolio"));
const Test = lazy(() => import("./pages/portfolio/test"));
const NoFeedback = lazy(() => import("./pages/feedback/no_feedback"));
const Users = lazy(() => import("./pages/users/_page"));
const AdminAccess = lazy(() => import("./pages/admin_access/_page"));
const Billing = lazy(() => import("./pages/billing/billing"));
const ColumnMappingPage = lazy(() => import("./pages/billing/mapping"));
const SubscriptionPayment = lazy(
  () => import("./pages/billing/subscription_billing"),
);

function App() {
  const [userSession] = useState(getUserSession());
  const [configLoaded] = useState<boolean>(false);

  const appState = useSelector<RootState, IAppState>((state) => state.system);

  useEffect(() => {}, [configLoaded]);

  return (
    <>
      <ToastContainer progressClassName="toast-progress" />

      {appState.loading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-gray-100 bg-opacity-70">
          <PageLoader />
        </div>
      )}

      <BrowserRouter>
        <Suspense
          fallback={
            <div className="fixed inset-0 flex items-center justify-center bg-white">
              <PageLoader />
            </div>
          }
        >
          <Routes>
            {!userSession ? (
              <>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/request-access" element={<RequestAccess />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                <Route path="/terms-and-conditions" element={<TNCS />} />
                <Route path="/data-processing-agreement" element={<DPA />} />
                <Route
                  path="/create-company-account"
                  element={<CreateCompanyAccount />}
                />
                <Route path="/billing-setup" element={<BillingSetup />} />
                <Route path="/billing/callback" element={<BillingCallback />} />
                <Route path="/admin-request" element={<AdminRequest />} />
                <Route path="/verification" element={<Verification />} />
                <Route
                  path="/admin-verification"
                  element={<AdminVerification />}
                />
                <Route
                  path="/password-reset/:token"
                  element={<PasswordChange />}
                />
                <Route path="/expired-link" element={<ExpiredLink />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route
                  path="/admin-request"
                  element={<Navigate to="/dashboard" />}
                />
                <Route
                  path="/verification"
                  element={<Navigate to="/dashboard" />}
                />
                <Route
                  path="/admin-verification"
                  element={<Navigate to="/dashboard" />}
                />
                <Route
                  path="/expired-link"
                  element={<Navigate to="/dashboard" />}
                />
              </>
            )}

            {userSession ? (
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Home />} />
                <Route path="portfolio" element={<Porfolio />} />
                <Route
                  path="portfolio-details/:id"
                  element={<PortfolioDetails />}
                />
                <Route
                  path="portfolio/edit-portfolio/:id"
                  element={<EditPortfolio />}
                />
                <Route path="after-upload" element={<Test />} />
                <Route path="feedback" element={<NoFeedback />} />
                <Route path="teams" element={<Users />} />
                <Route path="admin-access" element={<AdminAccess />} />
                <Route path="password-change" element={<PasswordChange />} />
                <Route path="billing" element={<Billing />} />
                <Route
                  path="portfolio/:id/mapping"
                  element={<ColumnMappingPage />}
                />
                <Route
                  path="susbscription-payment"
                  element={<SubscriptionPayment />}
                />
              </Route>
            ) : (
              <Route path="/dashboard/*" element={<Navigate to="/" />} />
            )}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
