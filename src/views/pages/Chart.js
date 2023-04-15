import React from "react";
import { Chart } from "react-google-charts";

export default function BarChart(props) {
  const { data, title } = props;
  return (
    <div>
      <Chart
        width={"1000px"}
        height={"300px"}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          // Material design options
          chart: {
            title,
            subtitle: "2021",
          },
        }}
        // For tests
        rootProps={{ "data-testid": "2" }}
      />
    </div>
  );
}
