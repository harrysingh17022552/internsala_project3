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
import { GoAlertFill } from "react-icons/go";
import { useEffect, useRef, useState } from "react";
//imported every necessary things that will be needed on this project
function App() {
  //the main data, that will render on every visit or on city changes, initially it will load data from data.js, which is dummy data
  const [weatherData, setWeatherData] = useState(data());
  // this state will toggle between fahrenheit or celsius, initially it is fahrenheit, because API will return temp in fahrenheit.
  const [tempUnit, setTempUnit] = useState("fahrenheit");
  // this state will manage input field, where user will type city to get weather
  const [city, setCity] = useState("");
  //this state will be used to store coordinate of user location when they visit this website.
  const [coordinates, setCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });
  //this state will manage the container of next 4 days forecast info
  const [showDetails, setShowDetails] = useState(false);
  //this state will store the info of forecast from 4 next forecasts, when user want to see them
  const [Details, setDetails] = useState({});
  //this state will control loading of this website
  const [loading, setLoading] = useState(true);
  //this state will store the every cities user search to get weather
  const [searchItem, setSearchItem] = useState([]);
  //manage the recent searches when user click search input field or move out of input field
  const [showSearch, setShowSearch] = useState(false);
  //this Ref will be mostly used when their will be any error from API side
  const errorRef = useRef(null);
  //this Ref will manage search input field error
  const searcherrorRef = useRef(null);

  //this function will render particular day weather forecast, so it could visible to user, when the click down arrow button
  const showDetail = (e, item) => {
    e.currentTarget.classList.remove("animate-bounce");
    setShowDetails(true);
    setDetails(item);
  };
  //this function will set error message, when their is any error
  const showErrorMessage = (message) => {
    errorRef.current.textContent = message;
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  //one of the main function : this function only work when user enter city to see weather and click search icon, it makes API calls and receive data if their is no error, other wise error message will be print using showErrorMessage function, try and catch is used to get other error than API if any. Here API takes city as a parameter.
  const searchCity = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${getDate()}/${getDate(
          3
        )}?unitGroup=us&key=SNVNZ8F7LF75WRMNAG6C7F7AS&contentType=json`,
        { method: "GET", headers: { "content-type": "application/json" } }
      );
      if (response.ok) {
        setSearchItem([
          ...searchItem.filter(
            (inthere) => inthere.toLowerCase() !== city.toLowerCase()
          ),
          city.toLowerCase(),
        ]);
        const data = await response.json();
        setWeatherData(data);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        return;
      } else if (response.status === 400) {
        showErrorMessage(
          "400 BAD_REQUEST : The City you are searching for, is not valid, try to search for particular cities, not a continent or country"
        );
        return;
      } else if (response.status === 401) {
        showErrorMessage(
          "401 UNAUTHORIZED : For this error, please contact me on my mail:harishnigam21@gmail.com"
        );
        return;
      } else if (response.status === 404) {
        showErrorMessage(
          "404 NOT FOUND : The City you are searching for, is not valid, try to search for particular cities, not a continent or country"
        );
        return;
      } else if (response.status === 429) {
        showErrorMessage(
          "400 TOO MANY REQUESTS : The account has exceeded its assigned limits."
        );
        return;
      } else if (response.status === 500) {
        showErrorMessage(
          "400 INTERNAL SERVER ERROR : A general error has occurred processing the request."
        );
        return;
      }
    } catch (error) {
      console.log(error);
      showErrorMessage(error);
    }
  };
  //one of the main function : this function only work when user visit this website or refresh the page, it makes API calls and receive data if their is no error, other wise error message will be print using showErrorMessage function, try and catch is used to get other error than API if any. Here API takes coordinates as a parameter.
  const locationCoords = async () => {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${
          coordinates.latitude
        }%2C${coordinates.longitude}/${getDate()}/${getDate(
          3
        )}?unitGroup=us&key=SNVNZ8F7LF75WRMNAG6C7F7AS&contentType=json`,
        { method: "GET", headers: { "content-type": "application/json" } }
      );
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        return;
      } else if (response.status === 400) {
        errorRef.current.textContent =
          "400 BAD_REQUEST : The City you are searching for, is not valid, try to search for particular cities, not a continent or country";
        return;
      } else if (response.status === 401) {
        errorRef.current.textContent =
          "401 UNAUTHORIZED : For this error, please contact me on my mail:harishnigam21@gmail.com";
        return;
      } else if (response.status === 404) {
        errorRef.current.textContent =
          "404 NOT FOUND : The City you are searching for, is not valid, try to search for particular cities, not a continent or country";
        return;
      } else if (response.status === 429) {
        errorRef.current.textContent =
          "400 TOO MANY REQUESTS : The account has exceeded its assigned limits.";
        return;
      } else if (response.status === 500) {
        errorRef.current.textContent =
          "400 INTERNAL SERVER ERROR : A general error has occurred processing the request.";
        return;
      }
    } catch (error) {
      console.log(error);
      errorRef.current.textContent = error;
    }
  };

  //this fuction is normal function, that is used to get user coordinates after their permission
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

  //this function simply return the image from their particular weather and change the body background image
  const setImage = () => {
    const component = weatherList().filter((item) =>
      weatherData.currentConditions.icon
        .toLowerCase()
        .includes(item.name.toLowerCase())
    );
    document.body.style.backgroundImage = `url(${component[0].bg})`;
    return component[0].image;
  };

  //this useEffect will work one time when user visit website, this will get user coordinate and check wheather user have their recent city searches in their session storage or not, if it is their then it will update the recent search list
  useEffect(() => {
    getLocation();
    const localData = sessionStorage.getItem("searchItem");
    if (!localData) {
      setSearchItem([]);
    }
    if (localData && JSON.parse(localData).length > 0) {
      setSearchItem(JSON.parse(localData));
    }
  }, []);

  //this useEffect will work when their is any changes in recent search list, either it is delete or update, it will update or create the list in session storage
  useEffect(() => {
    sessionStorage.setItem("searchItem", JSON.stringify(searchItem));
  }, [searchItem]);

  //this useEffect will work when their is any changes in user current coordinates, this is mostly triggers when user visit website and getLocation updates the coordinates
  useEffect(() => {
    if (coordinates?.latitude && coordinates?.longitude) {
      locationCoords();
    }
  }, [coordinates]);
  return loading ? (
    //loading container, loads till data fetch and store in state
    <section className="flex flex-col gap-8 items-center w-screen h-screen justify-center">
      <div className="flex justify-center items-center">
        <strong className="text-xl md:text-4xl">Loading</strong>
        <span className="loarder md:scale-150"></span>
      </div>
      {/* Takes error message from API and display here */}
      <p ref={errorRef} className="text-red-800 text-center md:text-2xl"></p>
    </section>
  ) : (
    //main section for this page
    <section
      className={`max-w-screen min-h-screen flex flex-wrap flex-col sm:flex-row p-2 gap-10 box-border text-black`}
    >
      {/* main heading for this website */}
      <h1 className="times text-3xl sm:text-4xl md:text-5xl text-blue-800 mix-blend-difference text-center basis-full invert">
        Weather Forecast
      </h1>
      {/* this article is UI for user to search weather for different cities and their current location */}
      <article className="flex flex-col justify-center items-center w-full">
        <div className="relative w-[98%] sm:w-[80%] md:w-[50%] flex items-center justify-center gap-4">
          <div
            className="relative flex flex-col items-center grow"
            onMouseLeave={() => setShowSearch(false)}
          >
            <input
              value={city}
              type="search"
              name="search"
              id="search"
              className="w-full p-2 rounded-md text-center border-2 grow bg-white opacity-90"
              autoComplete="off"
              placeholder="Enter City Name here..."
              onChange={(e) => setCity(e.target.value)}
              onClick={() => setShowSearch(true)}
            />
            {searchItem.length > 0 && showSearch && (
              <ul className="absolute flex flex-col justify-center items-center w-full rounded-b-xl mt-10 bg-gray-400 z-10 max-h-[300px] overflow-y-scroll noscrollbar">
                {searchItem.map((item, index) => (
                  <div
                    key={`searchItem/${index}`}
                    className="flex items-center hover:bg-gray-500 w-full p-4"
                  >
                    <li
                      className="w-full"
                      onClick={() => {
                        setCity(item);
                        setShowSearch(false);
                      }}
                    >
                      {item}
                    </li>
                    <ImCross
                      title="remove from history"
                      className="cursor-pointer absolute text-red-800 text-xs right-0 mr-4"
                      onClick={(e) => {
                        e.currentTarget.classList.add("animate-spin");
                        setTimeout(() => {
                          setSearchItem(
                            searchItem.filter(
                              (inthere) =>
                                inthere.toLowerCase() !== item.toLowerCase()
                            )
                          );
                        }, 1000);
                      }}
                    />
                  </div>
                ))}
              </ul>
            )}
          </div>
          <FaSearch
            title="click me to search"
            className="icon text-2xl"
            onClick={() => {
              city.length > 0
                ? searchCity()
                : (searcherrorRef.current.textContent =
                    "No city has been entered yet");
            }}
          />
          <button
            className="whitespace-nowrap p-2 rounded-md bg-gray-400"
            onClick={locationCoords}
          >
            Your Location
          </button>
        </div>
        {/* any error from search field side */}
        <strong className="text-xl text-red-800" ref={searcherrorRef}></strong>
      </article>
      {/* this article gives basic overview of todays weather, temp , current conditions and your location */}
      <article className="flex flex-col bg-white opacity-90 gap-4 p-4 rounded-3xl border-2 sm:w-[calc(50%-40px)] grow">
        {/* includes weather GIF, todays temp and toogle between fahrenheit and celcius also it include the max temp alert*/}
        <article className="flex justify-between items-center">
          <img
            src={setImage()}
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
            {weatherData.currentConditions.temp >= 104 && (
              <GoAlertFill className="text-2xl self-center text-red-600 animate-pulse" />
            )}
            <div
              className="bg-black w-14 h-7 self-center rounded-full flex items-center transition-all"
              title="Toggle Temp Unit"
            >
              <p
                className="bg-white aspect-square rounded-full w-6 transition-all cursor-pointer text-center text-red-800"
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
        {/* includes todays weather description, your location info */}
        <article className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <strong>
              {weatherData.resolvedAddress.toUpperCase()} (
              {weatherData.timezone})
            </strong>
            <p className="whitespace-normal">{weatherData.description}</p>
            <p>TODAY, {getDate()}</p>
          </div>
        </article>
      </article>
      {/*this article gives brief overview of todays weather like wind flow, humidity, cloud, sun rise time, sun set time,temp, their is refresh button that work on condition and that condition that when their is no input it will refresh weather for its current location otherwise it will refresh weather for the city entered in search input field.*/}
      <article className="flex flex-col bg-white opacity-90 gap-4 p-4 rounded-3xl border-2 sm:w-[calc(50%-40px)] grow">
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
      {/* this article will list next 4 days weather forecast, initially with minimum info like date, weathre icon and temp, to show details info user have to click down arrow functon that will make visible the container that will container detail info of weather like wind flow, humidity, cloud, sun rise time, sun set time,temp for the respective day to see other day forecast they have to click their respective down arrow. Here their is also a refesh button it will work same as above refresh button*/}
      <article className="flex flex-col gap-12 bg-white opacity-90 p-4 rounded-3xl border-2 basis-full overflow-scroll noscrollbar">
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
              className="absolute top-0 right-0 text-xl text-red-800 cursor-pointer"
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
