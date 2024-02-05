
import { WithoutResults } from "../components/WithoutResults";
import { Footer, Header, NavBar } from "./components"
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRequestCounter } from "../hooks";


export const Layout = ({ children }) => {
  const { news } = useSelector(state => state.news)
  const countRequest = useRequestCounter();
  const [hasLoaded, setHasLoaded] = useState(false);

  //Recordar: Primero se renderiza el componente y luego se ejecuta el useEffect
  useEffect(() => {
    let timer = null;
    if (countRequest == 0) {
      timer = setTimeout(() => {
        setHasLoaded(true)
      }, 20);
    }
    else {
      setHasLoaded(false);
    }
    return ()=>{
      if(timer){
        clearTimeout(timer)
      }
    }
  }, [news, countRequest])

  return (
    <>
      <Header />
      <NavBar />
      {
        news.length == 0 && hasLoaded
          ? <WithoutResults />
          :
          <>
            {children}
          </>
      }
      <Footer />

    </>
  )
}

Layout.propTypes = {
  children: PropTypes.any.isRequired,

}
