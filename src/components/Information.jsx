import axios from "axios";
import { useEffect, useState } from "react";

import { MapPin, CalendarBlank, CloudSun, Thermometer } from "phosphor-react";
import SemiCircleProgressBar from "react-progressbar-semicircle";
import { ScaleLoader } from "react-spinners";
import Wind from "../assets/wind.png";

function Information() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=Brasilia,BR&&units=metric&appid=134f8482df4f325eeaf9c25ed4b52aa8&lang=pt_br`
      )
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        setLoading(response.data)
      });

    
      setTimeout(() => {
        setLoading(false);
      }, 2000);
  }, []);

  const searchLocation = async (event) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&&units=metric&appid=134f8482df4f325eeaf9c25ed4b52aa8&lang=pt_br`;

    if (event.key === "Enter") {
      await axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
        setLoading(response.data)
      });

      setLocation("");

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  try {
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString(
      "pt-br",
      { hour: "2-digit" }
    );
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString(
      "pt-br",
      { hour: "2-digit" }
    );
    const data2 = new Date(data.dt * 1000).toLocaleTimeString("pt-br", {
      hour: "2-digit",
    });

    var perc = ((data2 - sunrise) / (sunset - sunrise)) * 100;
    console.log(perc);
  } catch (err) {
    console.log(err);
  }

  var windVelocity = (data.wind ? data.wind.speed : null * 3.6).toFixed(2);

  return (
    <>
      
      <input
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        onKeyDown={searchLocation}
        type="text"
        className="w-56 h-9 self-center outline-none rounded-md px-2  bg-opacity-70 backdrop-blur-xl drop-shadow-sm bg-[#19262C] text-teal-50 placeholder:text-teal-50"
        placeholder="Onde você está? "
        setLoading={true}
      />
     {loading ? 
        <ScaleLoader color={"#4B8485"} className="flex items-center justify-center m-4 py-8" loading={loading} size={150}/>
       :  <div className="flex flex-wrap justify-center items-center">
        <div className=" flex flex-col justify-end w-96 h-[400px] m-5 bg-[#19262C] rounded-3xl bg-opacity-40 backdrop-blur-xl drop-shadow-sm py-10">
          <h2 className="text-teal-50 px-10 font-bold text-4xl items-end leading-loose">
            <img
              className="w-20"
              src={`http://openweathermap.org/img/wn/${
                data.weather ? data.weather[0].icon : null
              }@2x.png`}
            />
            {data.main ? <h2> {Math.round(data.main.temp)}°C</h2> : null}
          </h2>
          <p className="mt-2 flex gap-2 text-sm font-light items-center text-teal-50 px-10 leading-loose">
            {" "}
            <CloudSun></CloudSun>
            {data.weather ? <h2>{data.weather[0].description}</h2> : null}
          </p>
          <div>
            <p className="flex px-10  text-teal-50 opacity-40">
              __________________________
            </p>
          </div>
          <p className="mt-2 flex gap-2 text-sm items-center text-teal-50 px-10 font-bold leading-loose">
            {" "}
            <MapPin className="flex justify-center"></MapPin> {data.name}
          </p>
          <p className="mt-2 flex gap-2 text-sm items-center text-teal-50 px-10 font-bold leading-loose ">
            <CalendarBlank></CalendarBlank>{" "}
            {new Date(data.dt * 1000).toLocaleString("pt-br")}
          </p>
        </div>

        {/*------------------------------------------------*/}
        <div className=" flex flex-col  justify-around w-[750px] h-[400px] m-2 bg-[#19262C] rounded-3xl bg-opacity-40 backdrop-blur-lg drop-shadow-lg">
       
       <div className="flex   py-1 px-6 justify-between">
         {/*-------------------Nascer e por do sol--------------------*/}
         <div className=" w-[340px] h-60 rounded-lg self-end bg-black bg-opacity-20 backdrop-blur-lg drop-shadow-lg">
           <p className="text-teal-50 text-sm px-2 py-2">
             Nascer e Pôr do Sol
           </p>
           <div className="flex items-center flex-col  justify-between px-2 py-6">
             <SemiCircleProgressBar
               percentage={perc}
               stroke="#F8A94C"
               strokeWidth={2}
             ></SemiCircleProgressBar>
           </div>
           <div className="flex justify-between px-2">
             <p className="  text-teal-50 text-[12px] text-light ">
               Nascer do Sol
               <br />
               {data.sys
                 ? new Date(data.sys.sunrise * 1000).toLocaleTimeString(
                     "pt-br",
                     { hour: "2-digit", minute: "2-digit" }
                   )
                 : null}
             </p>
             <p className=" text-teal-50 text-[12px] text-light">
               Pôr do sol
               <br />
               {data.sys
                 ? new Date(data.sys.sunset * 1000).toLocaleTimeString(
                     "pt-br",
                     { hour: "2-digit", minute: "2-digit" }
                   )
                 : null}
             </p>
           </div>
         </div>
         {/*-------------------Vento--------------------*/}
         <div className=" flex flex-col w-[340px] h-60 rounded-lg  bg-black bg-opacity-20 backdrop-blur-lg drop-shadow-lg">
           <p className=" text-teal-50 text-sm px-2 py-2">
             Velocidade do vento
           </p>

           <img src={Wind} className=" self-center w-24 py-4" />
           <div className="flex justify-center">
             <p className="text-teal-50 text-[35px] py-2 mt-2 ">
               {windVelocity}
             </p>
             <p className=" text-teal-50 self-center mt-4 flex gap-1 font-light text-[12px] opacity-60">
               Km/h
             </p>
           </div>
         </div>
       </div>

       {/*________________________Div Informações_____________________________*/}
       <div className="flex items-end mr-1 ml-1 justify-around">
         <div className="w-52 h-24  rounded-lg  self-end bg-black bg-opacity-20 backdrop-blur-lg drop-shadow-lg">
           <p className="text-teal-50 text-sm font-light px-2 py-2">
             Humidade
           </p>
           <p className=" flex text-teal-50 font-semibold text-4xl px-2 py-2 ">
             {data.main ? <h2>{data.main.humidity}</h2> : null}
             <p className="font-normal text-sm self-end px-1">%</p>
           </p>
         </div>
         <div className="w-52 h-24  rounded-lg  self-end bg-black bg-opacity-20 backdrop-blur-lg drop-shadow-lg">
           <p className="text-teal-50 px-2 py-2  text-sm font-light ">
             Pressão
           </p>
           <p className="flex self-end text-teal-50 font-semibold text-4xl px-2 py-2 ">
             {data.main ? <h2>{data.main.pressure}</h2> : null}
             <p className="self-end font-normal text-sm">hPa</p>
           </p>
         </div>
         <div className="w-52 h-24  rounded-lg  self-end bg-black bg-opacity-20 backdrop-blur-lg drop-shadow-lg">
           <p className="text-teal-50 px-2 py-2  text-sm font-light">
             Sensação Térmica
           </p>
           <p className="text-teal-50  text-4xl px-2 mt-2 flex gap-2">
             {" "}
             <Thermometer></Thermometer>
             {data.main ? (
               <h2>{Math.round(data.main.feels_like)}°</h2>
             ) : null}
           </p>
         </div>
       </div>
     </div>
     
        
      </div>
      }
    </>
  );
}

export default Information;
