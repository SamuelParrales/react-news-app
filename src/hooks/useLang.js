import { useSelector } from "react-redux"
import {Translator} from "../helpers";


export const useLang = () => {
    const {lang} = useSelector(state=>state.session);
    
    const Lang = (word)=>{
      
        return Translator.get(word,lang);
    }

    return Lang;
}
