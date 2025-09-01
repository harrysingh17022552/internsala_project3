import cloudy from "../GIFs/cloudy.gif";
import cold from "../GIFs/cold.gif";
import fog from "../GIFs/fog.gif";
import snow from "../GIFs/snow.gif";
import sunny from "../GIFs/sunny.gif";
import thunderstorm from "../GIFs/Thunderstorm.gif";
import windy from "../GIFs/windy.gif";
import rainy from "../GIFs/rainy.gif";
import { LuCloudy } from "react-icons/lu";
import { MdSevereCold } from "react-icons/md";
import { MdFoggy } from "react-icons/md";
import { IoMdRainy } from "react-icons/io";
import { TbCloudSnow } from "react-icons/tb";
import { IoIosPartlySunny } from "react-icons/io";
import { IoIosThunderstorm } from "react-icons/io";
import { RiWindyFill } from "react-icons/ri";
export const weatherList = () => {
  const list = [
    {
      id: 1,
      name: "cloudy",
      image: cloudy,
      icon: LuCloudy,
      classname: "text-4xl text-blue-200",
    },
    {
      id: 2,
      name: "cold",
      image: cold,
      icon: MdSevereCold,
      classname: "text-4xl text-blue-200",
    },
    {
      id: 3,
      name: "fog",
      image: fog,
      icon: MdFoggy,
      classname: "text-4xl text-gray-300",
    },
    {
      id: 4,
      name: "rainy",
      image: rainy,
      icon: IoMdRainy,
      classname: "text-4xl text-blue-300",
    },
    {
      id: 5,
      name: "snow",
      image: snow,
      icon: TbCloudSnow,
      classname: "text-4xl text-gray-200",
    },
    {
      id: 6,
      name: "clear",
      image: sunny,
      icon: IoIosPartlySunny,
      classname: "text-4xl text-yellow-300",
    },
    {
      id: 7,
      name: "thunderstorm",
      image: thunderstorm,
      icon: IoIosThunderstorm,
      classname: "text-4xl text-gray-400",
    },
    {
      id: 8,
      name: "windy",
      image: windy,
      icon: RiWindyFill,
      classname: "text-4xl text-gray-200",
    },
  ];
  return list;
};
