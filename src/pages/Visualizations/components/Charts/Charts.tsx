import { useCubeQuery } from "@cubejs-client/react";
import { useMemo } from "react";

import BarChart, {
  BarChartComponentProps,
} from "./components/BarChart/BarChart";
import PieChart, {
  PieChartComponentProps,
} from "./components/PieChart/PieChart";

import useCubeApi from "../../../../hooks/useCubeApi";

function Charts() {
  const cubeApi = useCubeApi();
  const {
    resultSet: yearWiseCountResultSet,
    isLoading: yearWiseCountIsLoading,
    error: yearWiseCountError,
  } = useCubeQuery(
    {
      dimensions: ["Meteorites.year"],
      measures: ["Meteorites.count"],
      order: {
        "Meteorites.year": "asc",
      },
    },
    {
      cubeApi,
    },
  );

  const {
    resultSet: countryWiseCountResultSet,
    isLoading: countryWiseCountIsLoading,
    error: countryWiseCountError,
  } = useCubeQuery(
    {
      dimensions: ["Meteorites.country"],
      measures: ["Meteorites.count"],
    },
    {
      cubeApi,
    },
  );

  const {
    resultSet: countryWiseMassResultSet,
    isLoading: countryWiseMasstIsLoading,
    error: countryWiseMassError,
  } = useCubeQuery(
    {
      dimensions: ["Meteorites.country"],
      measures: ["Meteorites.totalMass"],
    },
    {
      cubeApi,
    },
  );

  const yearWiseCountData = useMemo<BarChartComponentProps["data"]>(() => {
    if (yearWiseCountResultSet) {
      return yearWiseCountResultSet.tablePivot().map((item) => ({
        year: item["Meteorites.year"] as string,
        count: parseInt(item["Meteorites.count"] as string),
      }));
    }
    return [];
  }, [yearWiseCountResultSet]);

  const countryWiseCountData = useMemo<PieChartComponentProps["data"]>(() => {
    if (countryWiseCountResultSet) {
      return countryWiseCountResultSet.tablePivot().map((item) => ({
        name: item["Meteorites.country"] as string,
        value: parseInt(item["Meteorites.count"] as string),
      }));
    }
    return [];
  }, [countryWiseCountResultSet]);

  const countryWiseMassData = useMemo<PieChartComponentProps["data"]>(() => {
    if (countryWiseMassResultSet) {
      return countryWiseMassResultSet.tablePivot().map((item) => ({
        name: item["Meteorites.country"] as string,
        value: parseInt(item["Meteorites.totalMass"] as string),
      }));
    }
    return [];
  }, [countryWiseMassResultSet]);

  return (
    <div>
      <BarChart
        data={yearWiseCountData}
        label="Year wise meteorite count"
        isLoading={yearWiseCountIsLoading}
        isError={!!yearWiseCountError}
      />
      <PieChart
        data={countryWiseCountData}
        label="Country wise meteorite count"
        isError={!!countryWiseCountError}
        isLoading={countryWiseCountIsLoading}
      />
      <PieChart
        data={countryWiseMassData}
        label="Country wise meteorite mass (grams)"
        isError={!!countryWiseMassError}
        isLoading={countryWiseMasstIsLoading}
      />
    </div>
  );
}

export default Charts;
