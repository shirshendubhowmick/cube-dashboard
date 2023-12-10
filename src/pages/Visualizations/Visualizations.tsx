import { useCallback, useState } from "react";

import Map from "./components/Map/Map";
import Charts from "./components/Charts/Charts";

function Visualizations() {
  const [isChartView, setIsChartView] = useState(true);

  const onClick = useCallback(() => {
    setIsChartView((prev) => !prev);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className="mb-16 rounded border border-solid border-gray-800 bg-gray-800 px-9 py-2 text-white"
      >
        {isChartView ? "Map view" : "Chart view"}
      </button>
      {isChartView ? <Charts /> : <Map />}
    </>
  );
}

export default Visualizations;
