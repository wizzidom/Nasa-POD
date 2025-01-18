import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const api = "https://api.nasa.gov/planetary/apod?";

  const [data, setData] = useState([]);
  const [display, setDisplay] = useState(false);
  function toggleDisplay() {
    display === false ? setDisplay(true) : setDisplay(false);
  }
  function bodyTouched() {
    display === true ? setDisplay(false) : display;
  }
  useEffect(() => {
    async function fetchData() {
      let day = Math.floor(Math.random() * (28 - 1 + 1)) + 1;
      let year = Math.floor(Math.random() * (2024 - 1996 + 1)) + 1996;
      let month = Math.floor(Math.random() * (12 - 1 + 1)) + 1;

      const response = await fetch(
        `${api}api_key=${apiKey}&date=${year}-${month}-${day}`
      );
      const datas = await response.json();
      setData(datas);
    }

    fetchData();
  }, []);

  return (
    <div
      className="nasa-body"
      style={{ backgroundImage: `url(${data.url})` }}
      onClick={bodyTouched}
    >
      <div className="des">
        <h3>Apod Project</h3>
        <br />
        <div className="cons">
          <h1>{data.title}</h1>
          <div className="info" onClick={toggleDisplay}>
            <FontAwesomeIcon icon={faCircleInfo} />
          </div>
        </div>
      </div>

      {display && (
        <div className="description">
          <p>{data.explanation}</p>
          <br />
          <p>Date: {data.date}</p>
        </div>
      )}
    </div>
  );
}
