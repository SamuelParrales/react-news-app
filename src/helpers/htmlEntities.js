export const toHtmlEntities = function(string) {
    return string.replace(/./gm, function(s) {
      // return "&#" + s.charCodeAt(0) + ";";
      return (s.match(/[a-z0-9\s]+/i)) ? s : '&#' + s.charCodeAt(0) + ';';
    });
  };



  export const  fromHtmlEntities = function(str) {
    var element = document.createElement('div');

  
        if(str && typeof str === 'string') {
        // strip script/html tags
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
        element.innerHTML = str;
        str = element.textContent;
        element.textContent = '';
        }

        return str;
  };
