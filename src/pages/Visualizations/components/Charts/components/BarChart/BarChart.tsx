import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Loader from "../../../../../../components/Loader/Loader";
import ErrorCard from "../../../../../../components/ErrorCard/ErrorCard";

export interface BarChartComponentProps {
  data: {
    year: string;
    count: number | number[];
  }[];
  label: string;
  isLoading?: boolean;
  isError?: boolean;
}

function Container(props: { children: React.ReactNode; label: string }) {
  return (
    <div className="inline-block h-[400px] w-full">
      <p className="mb-4 text-lg font-medium">{props.label}</p>
      {props.children}
    </div>
  );
}

function BarChartComponent(props: BarChartComponentProps) {
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
        <BarChart
          data={props.data}
          margin={{
            top: 5,

            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="count"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
}

export default BarChartComponent;
