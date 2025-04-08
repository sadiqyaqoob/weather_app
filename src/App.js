import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [wDetail, setWDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = (event) => {
    event.preventDefault();

    if (!city) return;

    setLoading(true);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
      .then((res) => res.json())
      .then((finalRes) => {
        console.log(finalRes);
        setWDetail(finalRes);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });

    setCity("");
  };

  return (
    <div className="container">
      <h1 className="heading">Simple Weather App</h1>

      <form onSubmit={getData} className="form-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City"
        />
        <button type="submit">Search</button>
      </form>

      <div className="weather-box">
        {loading ? (
          <p>Loading weather...</p>
        ) : wDetail && wDetail.cod === 200 ? (
          <>
            <h3>
              {wDetail.name} <span>{wDetail.sys.country}</span>
            </h3>
            <h2>{wDetail.main.temp}°C</h2>
            <img
              src={`http://openweathermap.org/img/w/${wDetail.weather[0].icon}.png`}
              alt="weather icon"
            />
            <p>{wDetail.weather[0].description}</p>
          </>
        ) : wDetail && wDetail.cod !== 200 ? (
          <p>City not found</p>
        ) : (
          <p>No Data</p>
        )}
      </div>
    </div>
  );
}

export default App;
