import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState('');
  const [favorites, setFavorites] = useState([]);

  const changeHandler = (event) => {
    setCity(event.target.value);
  };

  const addtofavoriets = (city) => {
    if(city.length===0){
      alert('please provide valid city name')
    }else {
      const temperatureString = `Temperature at ${city} is ${temperature}°C`;
      setFavorites([...favorites, temperatureString]);
      
    }
    
  };

  const submitHandler = (event) => {
    event.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5cd2f5378b59f0e8fc980f44cbf6d861`)
      .then((response) => response.json())
      .then((data) => {
        const kelvin = data.main.temp;
        const celsius = Math.round(kelvin - 273.15);
        const temperatureString = `${Math.round(celsius)}°C`;
        setTemperature(temperatureString);
        setCity('');
      })
      .catch((error) => console.log(error));
  };

  const itemList = favorites.map((item, index) => (
    <li key={index}>{item}</li>
  ));

  return (
    <div>
      <center>
        <div className='card'>
          <div className='card-body'>
            <h4 className='card-title'>Weather App</h4>
            <form onSubmit={submitHandler}>
              <input type='text' name='city' value={city} onChange={changeHandler} /><br />
              <input type='submit' value='Get Temperature' />
              <button className='button' onClick={() => addtofavoriets(city)}>Add to favorite</button>
            </form>
            <h3>Search state Weather report:</h3>
            <h1>{temperature}</h1>
            <ul className='d-flex flex-column justify-content-start'>
              {itemList}
            </ul>
          </div>
        </div>
      </center>
    </div>
  );
};

export default App;
