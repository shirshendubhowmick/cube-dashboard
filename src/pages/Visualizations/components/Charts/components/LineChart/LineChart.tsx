import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line,
  LineChart,
} from "recharts";

import Loader from "../../../../../../components/Loader/Loader";
import ErrorCard from "../../../../../../components/ErrorCard/ErrorCard";
import Container from "../Container/Container";

export interface LineChartComponentProps {
  data: {
    year: string;
    mass: number;
  }[];
  label: string;
  isLoading?: boolean;
  isError?: boolean;
}

function LineChartComponent(props: LineChartComponentProps) {
  if (props.isError) {
    return (
      <Container label={props.label}>
        <ErrorCard />
      </Container>
    );
  }

  if (props.isLoading) {
    return (
      <Container label={props.label}>
        <Loader />
      </Container>
    );
  }

  return (
    <Container label={props.label}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={props.data}
          margin={{
            top: 5,
            bottom: 5,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="mass" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
}

export default LineChartComponent;
