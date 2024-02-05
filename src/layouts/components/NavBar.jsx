import { Icon } from "@iconify/react";
import { useEffect, useRef } from "react";
import { useLang } from "../../hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { categories } from "../../data";

const cantGrid = 16;
const widthGrid = 150;
const widthReal = cantGrid*widthGrid; 
const html = document.documentElement;


export const NavBar = () => {

  const [searchParams] = useSearchParams();
  const navbarNav = useRef(null);
  const navbarPrev = useRef(null);
  const navbarNext = useRef(null);
  const Lang = useLang();
  const navigate = useNavigate();


  const onResize= ()=>{
    if(navbarNav.current){
      const computedStyle  = getComputedStyle(navbarNav.current);
      let positionRight = parseInt(computedStyle.right);
      let width = navbarNav.current.offsetWidth;
    
            
      if(widthReal-width<=positionRight){
        navbarNav.current.style.setProperty('right',`${widthReal-width}px`);
        return;
      }

      if(width>=positionRight)
      {
        navbarNav.current.style.setProperty('right',`${0}px`);
          return;
      }    
    }
  }
  useEffect(()=>{
    window.addEventListener('resize',onResize)

    if(navbarNav.current){
      navbarNav.current.style.gridTemplateColumns =`repeat( ${cantGrid},${widthGrid}px )`;  
    }

    return()=>{
      window.removeEventListener('resize',onResize);
    }
  },[navbarNav])


  const next = ({currentTarget})=>{

 
    const computedStyle  = getComputedStyle(navbarNav.current); //Consutar getComputedStyle
    const coordLastLink = navbarNav.current.lastElementChild.getBoundingClientRect();
    let positionRight = parseInt(computedStyle.right);
    let width = navbarNav.current.offsetWidth;
    let movRight = Math.floor(width/widthGrid)*widthGrid; //Obtiene cuantas columns puede mover en la pantlla
    let remainder = html.offsetWidth -width; //remainder between window width and width
    
    //New position
    let newRight = positionRight + movRight;
  
    
    if(coordLastLink.x+remainder-movRight<=html.offsetWidth){
      currentTarget.style.visibility = 'hidden';
      navbarNav.current.style.setProperty('right',`${widthReal-width}px`);
    }else{

      navbarNav.current.style.setProperty('right',`${newRight}px`);
    }
    
    navbarPrev.current.style.visibility = 'visible';
    currentTarget.disabled = false;


  }

  const prev = ({currentTarget})=>{
    const computedStyle  = getComputedStyle(navbarNav.current);
    const coordLastLink = navbarNav.current.firstElementChild.getBoundingClientRect();
    let positionRight = parseInt(computedStyle.right);
    let width = navbarNav.current.offsetWidth;
    let remainder = html.offsetWidth -width; //remainder between window width and width
    
    let movRight = Math.floor(width/widthGrid)*widthGrid;
    let newRight = positionRight - movRight;
    
    if(coordLastLink.x-remainder+movRight>=0)
    {
      currentTarget.style.visibility = 'hidden';
      navbarNav.current.style.setProperty('right',`${0}px`);

    }
    else
    {

      navbarNav.current.style.setProperty('right',`${newRight}px`);
    }
    navbarNext.current.style.visibility = 'visible';


  }

  return (
    <nav className="navbar container">
      
      <button  
        onClick={prev}
        type="button" 
        className="navbar__prev navbar__prev--hidden"
        ref={navbarPrev}
        >
          <Icon icon="ooui:previous-ltr" />
        
        </button>
      
      <div className="navbar__nav-container">
        <div ref={navbarNav} className="navbar__nav">
          {categories.map(category=>(
          <a 
            className={`navbar__link ${searchParams.get('category')==category.name.toLowerCase()?'active':''}`} 
            key={category.name} 
            href={`/news?category${category.name.toLocaleLowerCase()}`}
            onClick={(e)=>{
                e.preventDefault()
             
                const searchParams = new URLSearchParams(location.search);

                searchParams.set('category',category.name.toLocaleLowerCase())
         
                navigate(`/news?${searchParams.toString()}`)
               
            }}
          >
            <Icon icon={category.icon} /> {Lang(category.name)} 
          </a>  
          ))}
        </div>
      </div>

      <button 
        onClick={next} 
        className="navbar__next"
        ref={navbarNext}
      >
        <Icon icon="ooui:next-ltr" />
      </button>
      
    </nav>
  )
}
