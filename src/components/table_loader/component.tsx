import ContentLoader from "react-content-loader";

function TableLoader() {
  return (
    <>
      <ContentLoader
        className="-mt-40 -ml-4"
        height="700"
        width="1400"
        viewBox="0 0 1400 400"
      >
        <rect x="15" y="15" rx="4" ry="4" width="1350" height="50" />
        <rect x="15" y="80" rx="2" ry="2" width="1350" height="750" />
      </ContentLoader>
    </>
  );
}

export default TableLoader;
