//SingleTon
import  * as languages  from '../../lang';
class TranslatorST{
    constructor(){
        
        if(typeof TranslatorST.instance =='object'){
            return TranslatorST.instance;
        }
        
        TranslatorST.instance = this;

        return this;
    }

    get(word,lang){
        if(!languages[lang])
            return word;
        if(!languages[lang][word])
            return word;

        return languages[lang][word];
    }
}

const Translator = new TranslatorST();
export default Translator;