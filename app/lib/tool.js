class tool {
    constructor(props) {

    }
    cookie(){
        return{
            getCookie:(name)=>{
                let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg))
                    return (arr[2]);
                else
                    return null;
            },
            setCookie:(c_name, value, expiredays)=>{
                let exdate = new Date();
                exdate.setDate(exdate.getDate() + expiredays);
                document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
            },
            clearCookie:(name)=>{
                let exp = new Date();
                exp.setTime(exp.getTime() - 1);
                let cval = getCookie(name);
                if (cval != null)
                    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
            }
        }
    }
    localstorage(){
        let storage=window.localStorage;
        return {
            get(key){
                let data = storage.getItem(key);
                if(!data){return false}
                let jsonData = JSON.parse(data);
                return jsonData;
            },
            set(key,value){
                let stringData = JSON.stringify(value);
                storage.setItem(key,stringData);
            }
        }
    }
}

let lib_tool = new tool(),
    Cookie = lib_tool.cookie(),
    Localstorage = lib_tool.localstorage();

export {Cookie,Localstorage}
