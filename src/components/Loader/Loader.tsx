export interface LoaderProps {
  size: number;
}
function Loader() {
  return (
    <div className="inline-flex h-full w-full items-center justify-center">
      <p>Loading.....</p>
    </div>
  );
}

export default Loader;
