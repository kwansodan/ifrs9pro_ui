import NoPortfolioYet from "../../components/no_portfolio/_component";
import TableLoader from "../../components/table_loader/component";
import { usePortfolios } from "../../core/hooks/portfolio";
import PortfolioMain from "./main";

function Porfolio() {
  const { portfoliosQuery } = usePortfolios();

  return (
    <>
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
    </>
  );
}

export default Porfolio;
