import { useEffect, useRef } from "react";
import { useLang } from "../hooks"
import noFound from '/no-found.png'


export const WithoutResults = () => {
  const Lang = useLang();

  const refImg = useRef(null);

  useEffect(()=>{
    if(refImg){
      refImg.current.style.backgroundImage = `url(${noFound})` 
    }
  },[]);

  
  return (
    <section className="without-results">
      <div ref={refImg} className="without-results__img">
        <p className="without-results__msg">
          {Lang('No results found')}
        </p>
      </div>

    </section>
  )
}
