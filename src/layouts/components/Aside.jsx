import { useSelector } from "react-redux";
import { NewsCardSm } from "../../features/news/components"

import { memo} from "react";
import { MultiWeather } from "../../features/weather/components";



import PropTypes from 'prop-types';
import { useLang } from "../../hooks";


export const Aside = memo(function Aside({news}) {
  const {weathersDay,city} = useSelector(state=>state.weather);

  const Lang = useLang();
  return (
    <aside className="aside">
      <MultiWeather className="mt-2" weathers={weathersDay.slice(0,3)} city={city}/>
      <h2 className="aside__heading">{Lang('Outstanding')}</h2>
        {news.map(({title,source_id,link},index)=>(<NewsCardSm key={index} title={title} source={source_id} link={link}/>))}
        
    </aside>
  )
});
Aside.propTypes = {
  news: PropTypes.array.isRequired
}