import React from "react";
import "./styles.css";

const WeatherChartItem = ({ value, coefficient }) => {
  return (
    <div
      className="chart__item"
      style={
        value > 0
          ? { marginBottom: `${value * coefficient}px` }
          : { marginTop: `${-value * coefficient}px` }
      }
    >
      {value}
    </div>
  );
};

export { WeatherChartItem };
