import React from "react";
import { Button, Card, Col, Row } from "antd";
import { MinusOutlined, SyncOutlined } from "@ant-design/icons";
import "./styles.css";
import { Link } from "react-router-dom";

const ShortCard = ({ item, handleDelete, handleUpdate }) => {
  return (
    <Link to={`/${item.name.toLowerCase()}`}>
      <Card className="list__item" size="small" hoverable>
        <Row justify="space-between" align="middle">
          <Col flex="auto">
            <Row align="middle">
              <Col flex="50px">
                <Button
                  className="item__button"
                  type="text"
                  shape="circle"
                  icon={<SyncOutlined />}
                  onClick={handleUpdate}
                />
              </Col>
              <Col>
                <div className="item__header">
                  {item.name + ", " + item.sys.country}
                </div>
              </Col>
            </Row>
          </Col>
          <Col flex="auto">
            <div className="item__description">
              {item.weather[0].description}
            </div>
          </Col>
          <Col>
            <Row align="middle">
              <Col>
                <div className="item__temperature">
                  {Math.round(item.main.temp) - 273 + " °C"}
                </div>
              </Col>
              <Col>
                <div className="item__icon">
                  <img
                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    alt="icon"
                  />
                </div>
              </Col>
              <Col>
                <Button
                  danger
                  type="text"
                  shape="circle"
                  icon={<MinusOutlined />}
                  onClick={handleDelete}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </Link>
  );
};

export { ShortCard };
