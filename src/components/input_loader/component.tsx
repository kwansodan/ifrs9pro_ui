import ContentLoader from "react-content-loader";

function InputLoader() {
  return (
    <ContentLoader
      height={50}
      width={300}
      viewBox="0 0 300 50"
      aria-label="Loading input..."
      className="rounded-md"
    >
      <rect x="0" y="0" rx="8" ry="8" width="300" height="50" />
    </ContentLoader>
  );
}

export default InputLoader;
