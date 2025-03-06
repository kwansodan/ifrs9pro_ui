import { useEffect, useState } from "react";
import { Images } from "../../../data/Assets";
import { customerOverview, portfolioOverview } from "../../../data";
import Card from "../../../components/card/_component";
import NoPortfolioYet from "../../../components/no_portfolio/_component";

function Default() {
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

        <h3 className="text-[16px] font-semibold mt-7">Portfolio overview</h3>
        <div className="flex gap-4">
          {portfolioOverview.map((item: any) => (
            <Card
              key={item.name}
              title={item.name}
              value={item.fig}
              valueClassName="text-[#AFAFAF]"
            />
          ))}
        </div>

        <h3 className="text-[16px] font-semibold mt-4">Customer overview</h3>
        <div className="flex gap-4">
          {customerOverview.map((item: any) => (
            <Card
              key={item.name}
              title={item.name}
              value={item.fig}
              valueClassName="!text-[#F1F1F1]"
            />
          ))}
        </div>

        <div className="mb-12 md:max-w-[1341px] h-[298px] border-[1px] border-[#F0F0F0] rounded-[11px] mt-6">
          <div className="absolute bg-[#f9f8f8] px-6 py-2 w-[1341px] rounded-t-[11px]">
            Portfolios
          </div>
          <NoPortfolioYet />
        </div>
      </div>
    </>
  );
}

export default Default;
