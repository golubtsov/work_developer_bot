function check_lang(lan, arr_langs){
    for (const el of arr_langs) {
        for (const e of el) {
            if(e == lan){
                return true;
            }
        }
    }
    return false;
}

module.exports = check_lang;