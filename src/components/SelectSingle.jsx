import { Icon } from "@iconify/react"
import { useEffect, useRef, useState } from "react"
import PropTypes from 'prop-types';
import { Dictionary } from "../helpers";

export const SelectSingle = ({data,idSelected,onChange}={data:[],idSelected:1}) => { //data must have [{id,name}]
  
  // hOOKS
  const selectSingle = useRef(null);
  const elementsList = useRef(null);
  const selectSingleCurrentElem = useRef(null);
  const [elements] = useState(Dictionary.convert(data,'id'));
  const currentElem = elements[idSelected];

  
// Events
const onBlur = ({target})=>{   //Si pierde el focus
  //Utilizado para indicar si se dio click en otro select que se cierre el primero
  if(target.matches('.select-single') || target.matches('.select-single *'))
  {
    let currentSelectSingle = target;  

    if(!currentSelectSingle.classList.contains('select-single')){
      currentSelectSingle = currentSelectSingle.closest('.select-single')
    }
   
    if(currentSelectSingle!=selectSingle.current){
      elementsList.current.classList.remove('select-single__elements-list--show');
      selectSingleCurrentElem.current.classList.remove('select-single__current-element--focus');
      elementsList.current.style.height = '0px';
    }
    return;
  }

    elementsList.current.classList.remove('select-single__elements-list--show');
    selectSingleCurrentElem.current.classList.remove('select-single__current-element--focus');
    elementsList.current.style.height = '0px';
   
}


  useEffect(()=>{
    document.addEventListener('click',onBlur);

    return()=>{
      document.removeEventListener('click',onBlur);
    }
  },[]);
 
  // Functions
  const toggle = ({currentTarget})=>{
    const valueToggle = elementsList.current.classList.toggle('select-single__elements-list--show');
    
    if(valueToggle){
      const elem = elementsList.current.querySelector('.select-single__element');
      if(elem){
       
        const elemHeight = elem.offsetHeight;
        const newHeight = Object.values(elements).length*elemHeight;
        // document.querySelector().style.maxHeight
        elementsList.current.style.height = `${newHeight}px`;
        elementsList.current.style.maxHeight = `${5*elemHeight}px`;
        
      }
      currentTarget.classList.add('select-single__current-element--focus');
      return;
    }
    currentTarget.classList.remove('select-single__current-element--focus');
    elementsList.current.style.height = '0px';
  }

  const onClickElement= ({currentTarget})=>{
    elementsList.current.classList.remove('select-single__elements-list--show');
    selectSingleCurrentElem.current.classList.remove('select-single__current-element--focus');
    elementsList.current.style.height = '0px';
    onChange(currentTarget.dataset.id)
  }
  
  
  return (
    <div ref={selectSingle} className="select-single">
      <div 
        ref={selectSingleCurrentElem}
        className="select-single__current-element"
        onClick={toggle}  
      >
        {
          currentElem
          ?
          <>
            <span className="select-single__element-name">{currentElem.name}</span> <Icon icon={currentElem.icon} /><Icon icon="grommet-icons:down" />
          </>
          :
          <>
          <span className="select-single__element-name">You haven&apos;t </span> <div><Icon icon="grommet-icons:down" /></div>
          </>
        }
      </div>
      
        <div  className="select-single__elements-container"> 
          <ul ref={elementsList} className="select-single__elements-list">
            {
              elements
              ?
              
              Object.entries(elements).map(([,{id,name,icon}])=>(
                <li 
                  onClick={onClickElement}
                  data-id={id}
                  key={id}
                  className= {"select-single__element "+ (id==currentElem?.id && 'select-single__element--selected')}
                >
                    <Icon icon={icon}/> <span className="select-single__element-name">{name}</span> 
                </li>
              ))
              :
              <li  className="select-single__element">
                
              </li>
            }
        
          </ul>
        </div> 
   </div>
  )
}



SelectSingle.propTypes = {
  data: PropTypes.array,
  idSelected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
}
