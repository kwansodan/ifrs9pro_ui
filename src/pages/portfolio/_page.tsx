import NoPortfolioYet from "../../components/no_portfolio/_component";
import { usePortfolios } from "../../core/hooks/portfolio";
import PortfolioMain from "./main";

function Porfolio() {
  const { portfoliosQuery } = usePortfolios();

  return (
    <>
      {portfoliosQuery &&
      portfoliosQuery.data &&
      portfoliosQuery.data.data.length < 1 ? (
        <NoPortfolioYet />
      ) : (
        <PortfolioMain />
        // <Test />
      )}
    </>
  );
}

export default Porfolio;
