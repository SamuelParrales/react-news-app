import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useLang } from '../hooks';
import { Icon } from '@iconify/react';
export const Modal = function Modal({ 
        visible = false, 
        title = 'Title', 
        className, 
        onHide,
        children,
        zIndex = 1,
        unclosable = false,
    }) {

        const refModal = useRef(null);
        const [render, setRender] = useState(false);
        const Lang = useLang();
        useEffect(()=>{
    
            let timer;
            if(visible){
                setRender(true);
                timer = setTimeout(() => {
                    refModal.current?.classList?.add('modal--show')
                }, 20);
            }
            else{
                refModal.current?.classList?.remove('modal--show');
                timer = setTimeout(() => {
                    setRender(false);
                }, 500);
            }

            return ()=>{
                clearTimeout(timer);
            }
        
        },[visible])

     
    return (
        (render)   //Para que la animación funcione
        &&
        <div ref={refModal} className={`modal ${className} `} style={{zIndex}}>

            <div className="modal__content">
                <div className="modal__header">
                    <h3>{title}</h3> 
                    <button 
                        className='modal__close'
                        onClick={onHide}
                        style={{display:`${unclosable? 'none': ''}`}}
                    >
                        <Icon icon='material-symbols:close'/>
                    </button>
                </div>
                <hr />
                <div className="modal__body">
                    {children}
                </div>
                <hr />
                <div className="modal__footer">
                    <button style={{display:`${unclosable? 'none': ''}`}} className='modal__btn' onClick={onHide}>{Lang('Close')}</button>
                </div>
            </div>

        </div>

    )
}


Modal.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    visible: PropTypes.bool,
    children: PropTypes.any.isRequired,
    onHide: PropTypes.func.isRequired,
    zIndex: PropTypes.number,
    unclosable:PropTypes.bool,
}