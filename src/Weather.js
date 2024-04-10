import React from 'react';
import axios from 'axios';
import { useState} from 'react';
import './Weather.css';

function Weather() {
    const [data,setData]=useState(
        {
            celcius:10,
            name:'London',
            humidity:10,
            speed:2,
            image:'/Images/cloud.png'
        })

        // please install npm install axios before use

        const [name,setName]=useState('');
        const [error,setError]=useState('');

        const handleClick=()=>{
            if(name!=="")
            {
                const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=3b846043eb83eb3923a37eacb5b55cbf&&units=metric`;
                axios.get(apiUrl)
                .then(res=>{
                    let imagepath='';
                    if(res.data.weather[0].main==="Clouds")
                    {
                        imagepath="/Images/cloud.png"
                    }
                    else if(res.data.weather[0].main==="Clear")
                    {
                        imagepath="/Images/clear.png"
                    }
                    else if(res.data.weather[0].main==="Rain")
                    {
                        imagepath="/Images/cloud_rain.png"
                    }
                    else if(res.data.weather[0].main==="Drizzle")
                    {
                        imagepath="/Images/drizzle.png"
                    }
                    else if(res.data.weather[0].main==="Mist")
                    {
                        imagepath="/Images/mist.png"
                    }
                    else{
                        
                        imagepath="/Images/cloud.png"
                    }
                    console.log(res.data);
                    setData({...data,celcius:res.data.main.temp,name:res.data.name,
                        humidity:res.data.main.humidity,speed:res.data.wind.speed,
                        image:imagepath
                    })
                    setError('');
                })
                .catch(err =>{
                    if(err.response.status===404)
                    {
                        setError("Invalid city Name");
                    }
                    else{
                        setError('');
                    }
                    console.log(err)
            }); 
            }
        }

        return (
        <>
            <div className="container">
                <div className="weather">
                    <div className="search">
                        <input type="text" placeholder="Enter City Name" onChange={e=>setName(e.target.value)} />
                        <button><img src="/Images/search.png" alt="weather" onClick={handleClick} /></button>
                    </div>
                    <div className='error'>
                        <p>{error}</p>
                    </div>
                    <div className="winfo">
                        <img style={{ "width": "100px" }} src={data.image} alt="cloud" />
                        <h1>{Math.round(data.celcius)}°C</h1>
                        <h2>{data.name}</h2>
                        <div className="details">
                            <div className="col">
                                <img src="/Images/humidity.png" alt="Humidity" />
                                <div className="humidity">
                                    <p>{Math.round(data.humidity)}%</p>
                                    <p>Humidity</p>
                                </div>
                            </div>
                            <div className="col">
                            <img src="/Images/wind.png" alt="Humidity" />
                                <div className="wind">
                                    <p>{Math.round(data.speed)}</p>
                                    <p>Wind</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Weather;