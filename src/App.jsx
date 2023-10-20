import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [location, setlocation] = useState('')
  const [details, setdetails] = useState({
    name: '--',
    region: '--',
    temperature: '--',
    feels_like: '--',
    min: '--',
    max: '--',
    description: '--',
    icon: '--'
  })
  const handlesubmit = async () => {
    const data = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1dea735f54950b7d0ff276b74250c289#`)
    setdetails({
      name: data.data.name,
      region: data.data.sys.country,
      temperature: data.data.main.temp,
      feels_like: data.data.main.feels_like,
      min: data.data.main.temp_min,
      max: data.data.main.temp_max,
      description: data.data.weather[0].description,
      icon: data.data.weather[0].icon
    })
  }
  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">

          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-4 p-5" style={{border:'2px solid black',borderRadius:'10px'}}>

              <h3 className="mb-4 pb-2 fw-normal">Check the weather forecast</h3>

              <div className="input-group rounded mb-3">
                <input type="search" className="form-control rounded" placeholder="City" value={location} aria-label="Search"
                  aria-describedby="search-addon" onChange={(e) => { setlocation(e.target.value) }} />
                <a type="button" onClick={handlesubmit}>
                  <span className="input-group-text border-0 fw-bold" id="search-addon">
                    Check!
                  </span>
                </a>
              </div>


              <div className="card shadow-0 border">
                <div className="card-body p-4">

                  <h4 className="mb-1 sfw-normal">{details.name},{details.region}</h4>
                  <p className="mb-2">Current temperature: <strong>{details.temperature}°C</strong></p>
                  <p>Feels like: <strong>{details.feels_like}°C</strong></p>
                  <p>Max: <strong>{details.min}°C</strong>, Min: <strong>{details.max}°C</strong></p>

                  <div className="d-flex flex-row align-items-center">
                    <p className="mb-0 me-4">{details.description}</p>
                    {/* <i className='weather-icon fa-3x' style={{ backgroundImage: `url(${details.icon})`, color: '#eee' }}></i> */}
                    <img src={`http://openweathermap.org/img/w/${details.icon}.png`} className='weather-icon' alt="no image" />
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default App
