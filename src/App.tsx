import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/authentication/login/_page";
import Verification from "./pages/authentication/verification/_page";
import Home from "./pages/dashboard/home/_page";
import DashboardLayout from "./pages/layout/_dashboard_layout";
import Main from "./pages/dashboard/main/_page";
import NotFound from "./components/404/_component";
import Porfolio from "./pages/portfolio/_page";
import Test from "./pages/portfolio/test";
import Users from "./pages/users/_page";
import NoFeedback from "./pages/feedback/no_feedback";
import RequestAccess from "./pages/authentication/access/request_access";
import AdminRequest from "./pages/authentication/access/admin_request";
import AdminVerification from "./pages/authentication/verification/admin_verification";
import AdminAccess from "./pages/admin_access/_page";
import PasswordChange from "./pages/passwords/_page";
import ExpiredLink from "./pages/authentication/verification/expired_link";
import { IAppState } from "./core/interfaces";
import { getUserSession } from "./core/utility";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";
import { RootState } from "./core/stores";
import PageLoader from "./components/page_loader/_component";
import PortfolioDetails from "./pages/portfolio/portfolio_details";
import EditPortfolio from "./pages/portfolio/edit_portfolio";

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
        <Routes>
          {!userSession ? (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/request-access" element={<RequestAccess />} />
              <Route path="/admin-request" element={<AdminRequest />} />
              <Route path="/verification" element={<Verification />} />
              <Route
                path="/admin-verification"
                element={<AdminVerification />}
              />
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
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/signup" element={<Navigate to="/dashboard" />} />
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
              <Route path="main" element={<Main />} />
              <Route path="portfolio" element={<Porfolio />} />
              {/* <Route path="portfolio-main" element={<PortfolioMain />} /> */}
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
              <Route path="users" element={<Users />} />
              <Route path="admin-access" element={<AdminAccess />} />
              <Route path="password-change" element={<PasswordChange />} />
            </Route>
          ) : (
            <Route path="/dashboard/*" element={<Navigate to="/" />} />
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
