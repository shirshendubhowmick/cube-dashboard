import { PieChart, Pie, ResponsiveContainer, Tooltip } from "recharts";

import Loader from "../../../../../../components/Loader/Loader";
import ErrorCard from "../../../../../../components/ErrorCard/ErrorCard";
import Container from "../Container/Container";

export interface PieChartComponentProps {
  data: {
    name: string;
    value: number;
  }[];
  label: string;
  isLoading?: boolean;
  isError?: boolean;
}

function PieChartComponent(props: PieChartComponentProps) {
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
    <Container label={props.label} height={600}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={360}
            endAngle={0}
            data={props.data}
            cx="50%"
            cy="50%"
            outerRadius={180}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Container>
  );
}

export default PieChartComponent;
