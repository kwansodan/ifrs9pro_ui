import { AxiosError } from "axios";
import NoPortfolioYet from "../../components/no_portfolio/_component";
import TableLoader from "../../components/table_loader/component";
import { usePortfolios } from "../../core/hooks/portfolio";
import PortfolioMain from "./main";
import { ApiErrorPage } from "../errors/api";
import { useTranslation } from "react-i18next";

function Porfolio() {
  const { t } = useTranslation();
  const { portfoliosQuery } = usePortfolios();

  const handleRetry = () => {
    portfoliosQuery.refetch();
  };

  if (portfoliosQuery.isError) {
    const error = portfoliosQuery.error;

    let errorMessage = t("errors.networkErrorMessage");

    if (error instanceof AxiosError) {
      errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message;
    }

    return <ApiErrorPage message={errorMessage} onRetry={handleRetry} />;
  }

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
