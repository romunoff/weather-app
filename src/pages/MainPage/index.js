import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { ShortCard } from "../../components/ShortCard";
import "./styles.css";

const { Search } = Input;

const MainPage = () => {
  const [cityList, setCityList] = useState(
    localStorage.getItem("cityList")
      ? JSON.parse(localStorage.getItem("cityList"))
      : []
  );

  useEffect(() => {
    cityList.map((item) =>
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${item.name}&appid=e009218bddbd2feae58ade5ee4d4c376`
      )
        .then((data) => data.json())
        .then((data) =>
          setCityList((prevState) =>
            prevState.map((value) => (value.name !== data.name ? value : data))
          )
        )
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("cityList", JSON.stringify(cityList));
  }, [cityList]);

  const handlerSearch = (value) => {
    if (value) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=e009218bddbd2feae58ade5ee4d4c376`
      )
        .then((data) => data.json())
        .then((data) =>
          setCityList(
            cityList.some((item) => item.name === data.name)
              ? [...cityList]
              : [...cityList, data]
          )
        );
    }
  };

  const handleDelete = (event, item) => {
    event.preventDefault();
    setCityList((prevState) =>
      prevState.filter((element) => element.name !== item.name)
    );
    console.log(item);
    console.log("removed");
  };

  const handleUpdate = (event, item) => {
    event.preventDefault();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${item.name}&appid=e009218bddbd2feae58ade5ee4d4c376`
    )
      .then((data) => data.json())
      .then((data) =>
        setCityList((prevState) =>
          prevState.map((value) => (value.name !== data.name ? value : data))
        )
      );
    console.log("updated");
  };

  return (
    <div className="container">
      <div className="container__search">
        <Search
          allowClear
          onSearch={handlerSearch}
          enterButton="Search"
          placeholder="Enter city 'e.g. Kharkiv'"
        />
      </div>
      <div className="container__list">
        {cityList.map((item) => (
          <ShortCard
            key={item.name}
            item={item}
            handleDelete={(event) => handleDelete(event, item)}
            handleUpdate={(event) => handleUpdate(event, item)}
          />
        ))}
      </div>
    </div>
  );
};

export { MainPage };
