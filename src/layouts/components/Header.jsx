
import { useDispatch, useSelector } from "react-redux";
import { SelectSingle } from "../../components"
import { languages,countries } from "../../data"
import { setCountry, setLang } from "../../store/global/sessionSlice";
import { Icon } from "@iconify/react";
import { ModalSetting } from "./ModalSetting";
import { memo, useCallback, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useLang } from "../../hooks";
import { setSearchText } from "../../store/aside/newsSlice";

export const Header = memo(function Header(){

  const [visibleModalSetting, setVisibleModalSetting] = useState(false);
  const { country, lang } = useSelector(state => state.session);
  const { searchText } = useSelector(state => state.news);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const Lang = useLang();
  const dispatch = useDispatch();
  
  const onSearch = useCallback((e)=>{
    
    if(e.key=='Enter'){
      e.preventDefault();  //Para evitar que ocurra el submit

      if(e.target.value)      //Si tiene valor se aade
        searchParams.set('q',e.target.value)
      else
        searchParams.delete('q'); //Sino tiene valor se elimina para evitar que no encuentre resultados

      //Se redirecciona
      navigate({
        pathname: '/news',
        search: `?${searchParams.toString()}`,
      })
    }
  },[searchParams])
  
  const onChangeSearchText = useCallback((e)=>{
   
    dispatch(setSearchText({searchText: e.target.value}))
 
  },[dispatch])
  const onChangeCountry = useCallback((country) => {
    dispatch(setCountry(country))
  },[dispatch])

  const onChangeLang = useCallback((lang) => {
    dispatch(setLang(lang))
  },[dispatch])

  const onShowModalSetting = useCallback(()=>{
    setVisibleModalSetting(true);
  },[])

  const onHideModalSetting = useCallback(()=>{
    setVisibleModalSetting(false);
  },[]);
  return (

    <header className="header">
      <div className="header__content container">
        <div className="header__logo-container">
          <NavLink className='header__btn-home' to='/'>
            <img className="header__logo" src="/logo.png" alt="" />
            <img className="header__logo-sm" src="/logo-sm.png" alt="" />
          </NavLink>
        </div>

        <div className="header__input-container">
          <label className="header__label-search">
            <input 
              value={searchText}
              className="form-input header__input-search" 
              type="search" 
              placeholder={Lang('What do you want to search for?')}
              onKeyDown={onSearch}
              onChange={onChangeSearchText}
              required
            />
          </label>
        </div>
        <div className="header__options">
          <SelectSingle
            data={countries.map(({ code, ...d }) => ({ id: code, ...d }))}
            idSelected={country || 'us'}
            onChange={onChangeCountry}
          />
          <SelectSingle
            data={languages.map(({ code, ...d }) => ({ id: code, ...d }))}
            idSelected={lang || 'en'}
            onChange={onChangeLang}
          />
          <div className="header__setting">
            <div className="header__setting-icon">
              <Icon icon={countries.find((c) => c.code == country)?.icon} />
              <Icon icon={languages.find((l) => l.code == lang)?.icon} />
            </div>

            <button onClick={onShowModalSetting} className="header__btn-setting"><Icon icon="ant-design:setting-filled" /></button>
          </div>
          <ModalSetting 
            onHide={onHideModalSetting} 
            countries={countries} 
            languages={languages}
            visible = {visibleModalSetting}
            onChangeCountry= {onChangeCountry}
            onChangeLang = {onChangeLang}
          />
        </div>
      </div>

    </header>
  )
})
