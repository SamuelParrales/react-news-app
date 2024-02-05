
import { Icon } from "@iconify/react";
import { days } from "../../../data/days";
import { weatherAnimation } from "../../../data/weatherAnimation"
import PropTypes from 'prop-types';
import { useLang } from "../../../hooks";


export const MultiWeather = ({weathers=[], city={},className=''}) => {

  const {name} = city;
  const Lang = useLang();

 
  return (
    <section className={`multi-weather ${className}`}>
      <div>
        <h3 className="multi-weather__heading"><Icon icon="ph:map-pin-fill" />{name}</h3>
      </div>
      <div className="multi-weather__grid">
      {weathers.map(({weather,dt,main:{temp}},index)=>(
          <figure key={index} className="multi-weather__figure">
            <h4 
              className="multi-weather__day"
            >
              {index==0? Lang('Today'):Lang(days[(new Date(dt*1000)).getUTCDay()])} 
            </h4>
            <img 
            src={weatherAnimation[weather[0].main] || weatherAnimation['default']} 
        
            alt="" 
            />
            <p className="multi-weather__temp">{temp.toString().slice(0,-2)} ° C</p>
          </figure>
        )
      
      )}
      </div>
      
    </section>
  )
}
MultiWeather.propTypes = {
 weathers: PropTypes.array.isRequired,
 city: PropTypes.object.isRequired,
 className: PropTypes.string,
}
