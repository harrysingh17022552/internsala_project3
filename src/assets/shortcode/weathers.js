import cloudy from "../GIFs/cloudy.gif";
import cold from "../GIFs/cold.gif";
import fog from "../GIFs/fog.gif";
import snow from "../GIFs/snow.gif";
import sunny from "../GIFs/sunny.gif";
import thunderstorm from "../GIFs/Thunderstorm.gif";
import wind from "../GIFs/windy.gif";
import rain from "../GIFs/rain.gif";
import { LuCloudy } from "react-icons/lu";
import { MdSevereCold } from "react-icons/md";
import { MdFoggy } from "react-icons/md";
import { IoMdRainy } from "react-icons/io";
import { TbCloudSnow } from "react-icons/tb";
import { IoIosPartlySunny } from "react-icons/io";
import { IoIosThunderstorm } from "react-icons/io";
import { RiWindyFill } from "react-icons/ri";
import rain_bg from "../images/rain_bg.jpg";
import sunny_bg from "../images/sunny_bg.jpg";
import cloudy_bg from "../images/cloudy_bg.jpg";
import cold_bg from "../images/cold_bg.jpg";
import fog_bg from "../images/fog_bg.jpg";
import snow_bg from "../images/snow_bg.jpg";
import thunder_bg from "../images/thunder_bg.jpg";
import wind_bg from "../images/wind_bg.jpg";
import shower_bg from "../images/shower_bg.jpg";
export const weatherList = () => {
  //A list that contain information about weather, type of weather, its image and styling w.r.t that weather. Keeping object of each weather very helpful to render information when weather changes
  const list = [
    {
      id: 1,
      name: "cloudy",
      image: cloudy,
      icon: LuCloudy,
      classname: "text-4xl text-blue-200",
      bg: cloudy_bg,
    },
    {
      id: 2,
      name: "cold",
      image: cold,
      icon: MdSevereCold,
      classname: "text-4xl text-blue-200",
      bg: cold_bg,
    },
    {
      id: 3,
      name: "fog",
      image: fog,
      icon: MdFoggy,
      classname: "text-4xl text-gray-300",
      bg: fog_bg,
    },
    {
      id: 4,
      name: "rain",
      image: rain,
      icon: IoMdRainy,
      classname: "text-4xl text-blue-300",
      bg: rain_bg,
    },
    {
      id: 5,
      name: "snow",
      image: snow,
      icon: TbCloudSnow,
      classname: "text-4xl text-gray-200",
      bg: snow_bg,
    },
    {
      id: 6,
      name: "clear",
      image: sunny,
      icon: IoIosPartlySunny,
      classname: "text-4xl text-yellow-300",
      bg: sunny_bg,
    },
    {
      id: 7,
      name: "thunder",
      image: thunderstorm,
      icon: IoIosThunderstorm,
      classname: "text-4xl text-gray-400",
      bg: thunder_bg,
    },
    {
      id: 8,
      name: "wind",
      image: wind,
      icon: RiWindyFill,
      classname: "text-4xl text-gray-200",
      bg: wind_bg,
    },
    {
      id: 9,
      name: "shower",
      image: rain,
      icon: IoMdRainy,
      classname: "text-4xl text-blue-300",
      bg: shower_bg,
    },
  ];
  return list;
};
