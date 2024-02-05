import { Icon } from "@iconify/react";
import { Modal } from "../../components/Modal"
import Proptypes from 'prop-types';
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLang } from "../../hooks";

export const ModalSetting = (
    { 
        visible, 
        countries, 
        languages, 
        onHide,
        onChangeCountry,
        onChangeLang
    }) => {

    const {country,lang} = useSelector(state=>state.session)
    const Lang = useLang();

    const onResize =  useCallback(()=>{
        if(window.innerWidth>768 && visible){
            onHide();
        }
    },[visible,onHide])

    useEffect(() => {
        window.addEventListener('resize', onResize)
       
        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, [onResize])
    return (
        <Modal
            className="modal-setting"
            title={Lang('Setting')}
            visible={visible}
            onHide={onHide}
        >
            <div className="modal-setting__body">
                <h4>{Lang('Countries')}</h4>
                <div className="modal-setting__grid">
                    {countries.map((c, index) => (
                        <button 
                            onClick={()=>onChangeCountry(c.code)}
                            className={`modal-setting__btn ${c.code==country && 'modal-setting__btn--selected'}`} 
                            key={index}
                        >
                            <Icon icon={c.icon} className="me-1"/>{c.name}
                        </button>
                    ))}
                </div>
                <h4>{Lang('Languages')}</h4>
                <div className="modal-setting__grid">
                    {languages.map((l, index) => (
                        <button 
                            onClick={()=>onChangeLang(l.code)}
                            className={`modal-setting__btn ${l.code==lang && 'modal-setting__btn--selected'}`} 
                            key={index}
                        >
                            <Icon className="me-1" icon={l.icon} />{l.name}
                        </button>
                    ))}
                </div>
            </div>

        </Modal>
    )
}

ModalSetting.propTypes = {
    countries: Proptypes.array,
    languages: Proptypes.array,
    visible: Proptypes.bool,
    onHide: Proptypes.func,
    onChangeCountry: Proptypes.func,
    onChangeLang: Proptypes.func
}