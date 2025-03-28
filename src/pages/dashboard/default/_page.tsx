import { useEffect, useState } from "react";
import { Images } from "../../../data/Assets";
import Card from "../../../components/card/_component";
import NoPortfolioYet from "../../../components/no_portfolio/_component";
import { usePortfolios } from "../../../core/hooks/portfolio";
import TableLoader from "../../../components/table_loader/component";
import PortfolioMain from "../../portfolio/main";
import { useDashboardStats } from "../../../core/hooks/dashboard";
import DashboardLoader from "../../../components/dashboard_loader/component";

function Default() {
  const { portfoliosQuery } = usePortfolios();
  const { dashboardStatsQuery } = useDashboardStats();
  const [currentDate, setCurrentDate] = useState("");
  const [greeting, setGreeting] = useState("");
  useEffect(() => {
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date());

    const hour = new Date().getHours();
    const greetingMessage =
      hour < 12
        ? "Good morning"
        : hour < 18
        ? "Good afternoon"
        : "Good evening";

    setCurrentDate(formattedDate);
    setGreeting(greetingMessage);
  }, []);

  return (
    <>
      <div>
        <h3 className="text-[#6F6F6F] text-[14px] font-normal mt-6">
          {currentDate}
        </h3>
        <div className="flex items-center">
          <h3 className="text-[#1E1E1E] text-[18px]">{greeting} User</h3>
          <img
            className="w-[20px] h-[20px] ml-2"
            src={Images.greeting}
            alt=""
          />
        </div>
        {dashboardStatsQuery?.isFetching ? (
          <>
            <div className="flex items-center">
              <DashboardLoader />
              <DashboardLoader />
              <DashboardLoader />
            </div>
            <div className="flex items-center -mt-[13rem]">
              <DashboardLoader />
              <DashboardLoader />
              <DashboardLoader />
            </div>
          </>
        ) : (
          <>
            <div>
              <h3 className="text-[16px] font-semibold mt-7">
                Portfolio overview
              </h3>
              <div className="flex gap-4">
                <Card
                  title={"Total local impairment"}
                  value={
                    dashboardStatsQuery &&
                    dashboardStatsQuery.data &&
                    dashboardStatsQuery.data.data.portfolio_overview.total_loans
                  }
                  valueClassName="text-[#AFAFAF]"
                />
                <Card
                  title={"Total ECL"}
                  value={
                    dashboardStatsQuery &&
                    dashboardStatsQuery.data &&
                    dashboardStatsQuery.data.data.portfolio_overview
                      .total_ecl_amount
                  }
                  valueClassName="text-[#AFAFAF]"
                />
                <Card
                  title={"Risk reserve"}
                  value={
                    dashboardStatsQuery &&
                    dashboardStatsQuery.data &&
                    dashboardStatsQuery.data.data.portfolio_overview
                      .total_risk_reserve
                  }
                  valueClassName="text-[#AFAFAF]"
                />
              </div>

              <h3 className="text-[16px] font-semibold mt-4">
                Customer overview
              </h3>
              <div className="flex gap-4">
                <Card
                  title={"Number of customers"}
                  value={
                    dashboardStatsQuery &&
                    dashboardStatsQuery.data &&
                    dashboardStatsQuery.data.data.customer_overview
                      .total_customers
                  }
                  valueClassName="text-[#AFAFAF]"
                />
                <Card
                  title={"Institutional loans"}
                  value={
                    dashboardStatsQuery &&
                    dashboardStatsQuery.data &&
                    dashboardStatsQuery.data.data.customer_overview
                      .institutional
                  }
                  valueClassName="text-[#AFAFAF]"
                />
                <Card
                  title={"Consumer loans"}
                  value={
                    dashboardStatsQuery &&
                    dashboardStatsQuery.data &&
                    dashboardStatsQuery.data.data.customer_overview.individual
                  }
                  valueClassName="text-[#AFAFAF]"
                />
                <Card
                  title={"Mixed"}
                  value={
                    dashboardStatsQuery &&
                    dashboardStatsQuery.data &&
                    dashboardStatsQuery.data.data.customer_overview.mixed
                  }
                  valueClassName="text-[#AFAFAF]"
                />
              </div>
            </div>
          </>
        )}

        {portfoliosQuery?.isLoading ? (
          <>
            <TableLoader />
          </>
        ) : (
          <>
            {portfoliosQuery &&
            portfoliosQuery.data &&
            portfoliosQuery.data.data.items.length > 0 ? (
              <PortfolioMain />
            ) : (
              <NoPortfolioYet />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Default;
