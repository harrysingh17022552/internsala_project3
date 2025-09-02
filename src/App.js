import { IoIosRefresh } from "react-icons/io";
import { GiHeatHaze } from "react-icons/gi";
import { WiHumidity } from "react-icons/wi";
import { FaCloud } from "react-icons/fa";
import { GiSunrise } from "react-icons/gi";
import { FaTemperatureHigh } from "react-icons/fa";
import { GiSunset } from "react-icons/gi";
import { data } from "./assets/shortcode/data";
import { getDate } from "./assets/shortcode/date";
import { weatherList } from "./assets/shortcode/weathers";
import { FaChevronDown } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FaSearch } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
function App() {
  const [weatherData, setWeatherData] = useState(data());
  const [tempUnit, setTempUnit] = useState("fahrenheit"); //fahrenheit or celsius
  const [city, setCity] = useState("");
  const [coordinates, setCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [showDetails, setShowDetails] = useState(false);
  const [Details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const errorRef = useRef(null);
  const searcherrorRef = useRef(null);
  const showDetail = (e, item) => {
    e.target.classList.remove("animate-bounce");
    setShowDetails(true);
    setDetails(item);
  };
  const searchCity = async () => {
    setLoading(true);
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${getDate()}/${getDate(
        3
      )}?unitGroup=us&key=SNVNZ8F7LF75WRMNAG6C7F7AS&contentType=json`,
      { method: "GET", headers: { "content-type": "application/json" } }
    );
    if (!response.ok) {
      errorRef.current.textContent = `Something Wrong : ${response.status} : ${response.statusText}`;
      return;
    }
    const data = await response.json();
    console.log(data);

    setWeatherData(data);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const locationCoords = async () => {
    setLoading(true);
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${
        coordinates.latitude
      }%2C${coordinates.longitude}/${getDate()}/${getDate(
        3
      )}?unitGroup=us&key=SNVNZ8F7LF75WRMNAG6C7F7AS&contentType=json`,
      { method: "GET", headers: { "content-type": "application/json" } }
    );
    if (!response.ok) {
      errorRef.current.textContent = `Something Wrong : ${response.status} : ${response.statusText}`;
      return;
    }
    const data = await response.json();
    console.log(data);

    setWeatherData(data);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const getLocation = async () => {
    function Location() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }

    function success(position) {
      setCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }

    function error() {
      alert("Sorry, no position available.");
    }
    Location();
  };
  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (coordinates?.latitude && coordinates?.longitude) {
      console.log("Coordinates updated:", coordinates);
      locationCoords();
    }
  }, [coordinates]);
  return loading ? (
    <section className="flex flex-col gap-8 items-center">
      <h1>Loading...</h1>
      <p ref={errorRef} className="text-red-600 text-4xl"></p>
    </section>
  ) : (
    <section
      className={`min-w-screen min-h-screen flex flex-wrap flex-col sm:flex-row gap-10 p-4 box-border text-black`}
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-blue-800 text-center basis-full">
        Weather Forecast
      </h1>
      <article className="flex flex-col justify-center items-center w-full">
        <div className="relative w-[98%] sm:w-[80%] md:w-[50%] flex items-center">
          <input
            value={city}
            type="search"
            name="search"
            id="search"
            className="w-full p-2 rounded-md text-center border-2"
            placeholder="Enter City Name here..."
            onChange={(e) => setCity(e.target.value)}
          />
          <FaSearch
            title="click me to search"
            className="icon text-2xl absolute right-0 m-8"
            onClick={() => {
              city.length > 0
                ? searchCity()
                : (searcherrorRef.current.textContent =
                    "No city has been entered yet");
            }}
          />
        </div>
        <strong className="text-xl text-red-600" ref={searcherrorRef}></strong>
      </article>
      <article className="flex flex-col bg-white gap-4 p-4 rounded-3xl border-2 sm:w-[calc(50%-40px)] grow">
        <article className="flex justify-between items-center">
          <img
            src={
              weatherList().filter((item) =>
                weatherData.currentConditions.icon
                  .toLowerCase()
                  .includes(item.name.toLowerCase())
              )[0].image
            }
            alt={weatherData.currentConditions.icon}
            className="w-20 sm:w-40 rounded-lg"
          />
          <div className="flex flex-wrap md:flex-nowrap gap-4 justify-center">
            {tempUnit === "fahrenheit" ? (
              <h1 className="text-5xl after:content-['°F']">
                {Math.ceil(weatherData.currentConditions.temp)}
              </h1>
            ) : (
              <h1 className="text-5xl after:content-['°C']">
                {Math.ceil(((weatherData.currentConditions.temp - 32) * 5) / 9)}
              </h1>
            )}
            <div
              className="bg-black w-14 h-7 self-center rounded-full flex items-center transition-all"
              title="Toggle Temp Unit"
            >
              <p
                className="bg-white aspect-square rounded-full w-6 transition-all cursor-pointer text-center text-red-600"
                onClick={(e) => {
                  if (tempUnit === "fahrenheit") {
                    e.currentTarget.classList.add("translate-x-[130%]");
                    e.currentTarget.parentElement.style.background = "gray";
                    e.currentTarget.textContent = "F";
                    setTempUnit("celsius");
                  } else {
                    e.currentTarget.classList.remove("translate-x-[130%]");
                    e.currentTarget.parentElement.style.background = "black";
                    e.currentTarget.textContent = "C";
                    setTempUnit("fahrenheit");
                  }
                }}
              >
                C
              </p>
            </div>
          </div>
        </article>
        <article className="flex justify-between items-center">
          <div className="flex flex-col gap-2 whitespace-nowrap">
            <strong>
              {weatherData.resolvedAddress.toUpperCase()} (
              {weatherData.timezone})
            </strong>
            <p className="whitespace-normal">{weatherData.description}</p>
            <p>TODAY, {getDate()}</p>
          </div>
        </article>
      </article>
      <article className="flex flex-col bg-white gap-4 p-4 rounded-3xl border-2 sm:w-[calc(50%-40px)] grow">
        <article className="flex flex-nowrap justify-between items-center grow">
          <h1>TODAY</h1>
          <IoIosRefresh
            className="cursor-pointer"
            onClick={(e) => {
              e.currentTarget.classList.add("animate-spin");
              setTimeout(() => {
                city.length > 2 ? searchCity() : locationCoords();
              }, 2000);
            }}
          />
        </article>
        <strong className="text-center text-2xl uppercase text-gray-500 animate-pulse">
          {weatherData.currentConditions.conditions}
        </strong>
        <article className="flex flex-col gap-4 grow">
          <article className="flex flex-nowrap gap-4">
            <div className="flex flex-col items-center grow">
              <GiHeatHaze className="icon text-xl text-gray-400" />
              <p>WIND</p>
              <strong>{weatherData.currentConditions.windspeed}km/h</strong>
            </div>
            <div className="flex flex-col items-center grow">
              <WiHumidity className="icon text-xl text-blue-300" />
              <p>HUMIDITY</p>
              <strong>{weatherData.currentConditions.humidity}</strong>
            </div>
            <div className="flex flex-col items-center grow">
              <FaCloud className="icon text-xl text-blue-200" />
              <p>CLOUD</p>
              <strong>{weatherData.currentConditions.cloudcover}%</strong>
            </div>
          </article>
          <article className="flex flex-nowrap gap-4">
            <div className="flex flex-col items-center grow">
              <GiSunrise className="icon text-xl text-yellow-300" />
              <p>SUN RISE</p>
              <strong>
                {weatherData.currentConditions.sunrise.slice(0, 5)} AM
              </strong>
            </div>
            <div className="flex flex-col items-center grow">
              <FaTemperatureHigh className="icon text-xl text-red-500" />
              <p>TEMP</p>
              {tempUnit === "fahrenheit" ? (
                <strong className="after:content-['°F']">
                  {Math.ceil(weatherData.currentConditions.temp)}
                </strong>
              ) : (
                <strong className="after:content-['°C']">
                  {Math.ceil(
                    ((weatherData.currentConditions.temp - 32) * 5) / 9
                  )}
                </strong>
              )}
            </div>
            <div className="flex flex-col items-center grow">
              <GiSunset className="icon text-xl text-orange-600" />
              <p>SUN SET</p>
              <strong>
                0
                {parseInt(weatherData.currentConditions.sunset.slice(0, 2)) -
                  12}
                :{weatherData.currentConditions.sunset.slice(3, 5)} PM
              </strong>
            </div>
          </article>
        </article>
      </article>
      <article className="flex flex-col gap-12 bg-white p-4 rounded-3xl border-2 basis-full overflow-scroll noscrollbar">
        <article className="flex flex-nowrap justify-between items-center grow">
          <h1>Next 4 Days Forecast</h1>
          <IoIosRefresh
            className="cursor-pointer"
            onClick={(e) => {
              e.currentTarget.classList.add("animate-spin");
              setTimeout(() => {
                city.length > 2 ? searchCity() : locationCoords();
              }, 2000);
            }}
          />
        </article>

        <article className="flex gap-2 justify-between">
          {weatherData.days.map((item, index) => (
            <div
              className="flex flex-col grow items-center"
              key={`nextday/${index}`}
            >
              <div className="flex flex-col gap-2 items-center p-2 border-2 rounded-3xl">
                <strong>
                  {item.datetime.slice(-2)}/{item.datetime.slice(5, 7)}
                </strong>
                {(() => {
                  const IconComponent = weatherList().filter((weather) =>
                    item.icon.toLowerCase().includes(weather.name.toLowerCase())
                  )[0];

                  if (IconComponent) {
                    return (
                      <IconComponent.icon
                        className={`icon ${IconComponent.classname}`}
                      />
                    );
                  }

                  return null; // or a default icon like <FaQuestionCircle />
                })()}
                {tempUnit === "fahrenheit" ? (
                  <h1 className="after:content-['°F']">
                    {Math.ceil(item.temp)}
                  </h1>
                ) : (
                  <h1 className="after:content-['°C']">
                    {Math.ceil(((item.temp - 32) * 5) / 9)}
                  </h1>
                )}
                <FaChevronDown
                  className="icon text-2xl animate-bounce"
                  onClick={(e) => showDetail(e, item)}
                />
              </div>
            </div>
          ))}
        </article>
        {showDetails && (
          <article className="relative flex flex-col gap-4 p-4 rounded-3xl border-2 sm:w-[calc(75%-40px)] self-center grow">
            <article className="flex flex-col flex-nowrap justify-center items-center grow gap-4">
              <h1 className="text-center text-3xl animate-pulse">
                {Details.conditions}
              </h1>
              <h1 className="text-center">{Details.description}</h1>
            </article>
            <article className="flex flex-col gap-4 grow">
              <article className="flex flex-nowrap gap-4">
                <div className="flex flex-col items-center grow">
                  <GiHeatHaze className="icon text-xl text-gray-400" />
                  <p>WIND</p>
                  <strong>{Details.windspeed}km/h</strong>
                </div>
                <div className="flex flex-col items-center grow">
                  <WiHumidity className="icon text-xl text-blue-300" />
                  <p>HUMIDITY</p>
                  <strong>{Details.humidity}</strong>
                </div>
                <div className="flex flex-col items-center grow">
                  <FaCloud className="icon text-xl text-blue-200" />
                  <p>CLOUD</p>
                  <strong>{Details.cloudcover}%</strong>
                </div>
              </article>
              <article className="flex flex-nowrap gap-4">
                <div className="flex flex-col items-center grow">
                  <GiSunrise className="icon text-xl text-yellow-300" />
                  <p>SUN RISE</p>
                  <strong>{Details.sunrise.slice(0, 5)} AM</strong>
                </div>
                <div className="flex flex-col items-center grow">
                  <FaTemperatureHigh className="icon text-xl text-red-500" />
                  <p>TEMP</p>
                  {tempUnit === "fahrenheit" ? (
                    <strong className="after:content-['°F']">
                      {Math.ceil(Details.temp)}
                    </strong>
                  ) : (
                    <strong className="after:content-['°C']">
                      {Math.ceil(((Details.temp - 32) * 5) / 9)}
                    </strong>
                  )}
                </div>
                <div className="flex flex-col items-center grow">
                  <GiSunset className="icon text-xl text-orange-600" />
                  <p>SUN SET</p>
                  <strong>
                    0{parseInt(Details.sunset.slice(0, 2)) - 12}:
                    {Details.sunset.slice(3, 5)} PM
                  </strong>
                </div>
              </article>
            </article>
            <ImCross
              className="absolute top-0 right-0 text-xl text-red-500 cursor-pointer"
              onClick={(e) => {
                e.currentTarget.classList.add("animate-spin");
                setTimeout(() => {
                  setShowDetails(false);
                }, 2000);
              }}
            />
          </article>
        )}
      </article>
    </section>
  );
}
export default App;
