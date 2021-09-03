import React from "react";
import { Card } from "antd";
import { format } from "date-fns";
import "./styles.css";

const DetailCard = ({ item }) => {
  return (
    <Card size="small" style={{ width: "140px" }}>
      <div className="card">
        <div className="card__header">
          {format(new Date(item.dt_txt), "eeee")}
        </div>
        <div className="card__date">
          {format(new Date(item.dt_txt), "MMMM dd")}
        </div>
        <div className="card__icon">
          <img
            src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            alt="icon"
          />
        </div>
        <div className="card__temperature">
          {Math.round(item.main.temp) - 273 + " °C"}
        </div>
        <div className="card__description">{item.weather[0].description}</div>
      </div>
    </Card>
  );
};

export { DetailCard };
