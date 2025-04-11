import { useState } from 'react'


function App() {

  const [dataBase, setDataBase] = useState([]);
  const [location, setLocation] = useState("");

  const API_KEY = "bb0c5d595ce29763206c1a74d7369bb0";

  const latLonFind = async() => {
    if(!location || location == ""){
      setDataBase([{"temp" :"Location cant be empty", "windSpeed" : "Location cant be empty"}]);
      return;
    }

    const result = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${API_KEY}`);
    const data = await result.json();
    const lat = data[0]?.lat ?? null;
    const lon = data[0]?.lon ?? null;

    if(!lat || !lon){
      setDataBase([{"temp" : "Invalid", "windSpeed" : "Invalid"}]);
      return;
    }
    console.log(lat,lon);
    return {lat, lon};
  }

  const weatherAPI = async(lat, lon) => {
    const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
    const data = await result.json();
    console.log("temp : ", data.main.temp, "windSpeed : ", data.wind.speed);
    const temp = data.main.temp;
    const windSpeed = data.wind.speed;
    setDataBase([{"temp" : temp, "windSpeed" : windSpeed}]);
  }

  const handleAPI = () => {
    latLonFind().then(({lat, lon}) => {
      weatherAPI(lat, lon);
    });
  }

  return (
    <>
    <div 
        className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex justify-center items-center"
      >
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Weather App</h1>

          {/* Image Section */}
          <img
            src="https://images.unsplash.com/photo-1601134467661-3d775b999c8b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D"
            alt="weather"
            className="object-cover object-center rounded-t-2xl mb-6 w-full h-48"
          />

          {/* Input Section */}
          <div className="flex flex-col md:flex-row justify-center items-center mb-6">
            <input
              className="p-4 w-full md:w-3/4 mb-4 md:mb-0 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter City"
            />
            <button
              onClick={handleAPI}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg md:ml-4 transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>

          {/* Weather Data Section */}
          <div className="text-lg">
            <p className="text-gray-700">
              Temp: {dataBase[0]?.temp ?? "-"}
            </p>
            <p className="text-gray-700 mt-2">
              Wind Speed: {dataBase[0]?.windSpeed ?? "Enter City Name"}
            </p>
          </div>

          {/* Error handling */}
          {dataBase[0]?.temp === "Location can't be empty" || dataBase[0]?.temp === "Invalid" ? (
            <p className="mt-4 text-red-500 font-semibold">{dataBase[0]?.temp}</p>
          ) : null}
        </div>
      </div>  
    </>
  )
}

export default App
