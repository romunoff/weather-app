import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Col, Row } from "antd";
import { format } from "date-fns";
import { DetailCard } from "../../components/DetailCard";
import "./styles.css";

const CityPage = () => {
  const { city } = useParams();
  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState({});

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e009218bddbd2feae58ade5ee4d4c376`
    )
      .then((data) => data.json())
      .then((data) => setWeatherData(data));

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e009218bddbd2feae58ade5ee4d4c376`
    )
      .then((data) => data.json())
      .then((data) => setForecastData(data));
  }, [city]);

  return (
    typeof weatherData.main !== "undefined" &&
    typeof forecastData.list !== "undefined" && (
      <div className="forecast">
        <div className="forecast__city">
          {weatherData.name + ", " + weatherData.sys.country}
        </div>
        <div className="forecast__date">
          {format(new Date(), "eeee, dd MMMM yyyy")}
        </div>
        <div className="forecast__weather">
          <Row align="middle">
            <Col flex="50px">
              <div className="weather__icon">
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt="icon"
                />
              </div>
            </Col>
            <Col flex="200px">
              <div className="weather__temperature">
                {Math.round(weatherData.main.temp) - 273 + " °C"}
              </div>
            </Col>
            <Col>
              <div className="weather__description">
                {weatherData.weather[0].description}
              </div>
            </Col>
          </Row>
        </div>
        <Card
          size="small"
          style={{
            background: "lightgray",
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          5-Day Forecast
        </Card>
        <div className="forecast__weather">
          <Row justify="space-between">
            {forecastData.list.map(
              (item, index) =>
                item.dt_txt.includes("12:00:00") && (
                  <Col key={index}>
                    <DetailCard item={item} />
                  </Col>
                )
            )}
          </Row>
        </div>
      </div>
    )
  );
};

export { CityPage };
