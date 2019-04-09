module.exports=function (w, axios) {
    var version = "1.0.0";
    var userTransInfoURL = "//uic-api.beeplay123.com/uic/api/user/sdk/getUserInfo";
    var burydataURL="//platform-api.beeplay123.com/wap/api/sdkgamereport/save"
    function wfGame(selector) {
        return new wfGame.fn.init(selector)
    }
    // 停服脚本
    var script1 = document.createElement("script");
    var script1Url = 'https://wap.beeplay123.com/ErrorPage/server.js?time='+ (new Date()).getTime()
    script1.src = script1Url;
    document.getElementsByTagName('head') && document.getElementsByTagName('head')[0].appendChild(script1);

    wfGame.fn = wfGame.prototype = {
        constructor: wfGame,
        version: version,
        UserTransInfo: userTransInfoURL,
        burydata:burydataURL,
        game_key: "",
        channel: "",
        gameType:"",
        Authorization: "",
        pfInfo: "",
        gurl: '',
        ready: function (fn) {
            if (document.readyState === "complete") {
                fn()
            } else {
                if (document.addEventListener) {
                    document.addEventListener("DOMContentLoaded", fn)
                } else {
                    document.attachEvent("onreadystatechange", function () {
                        if (document.readyState === "complete") {
                            fn()
                        }
                    })
                }
            }
        },
        login: function (loginData, callback) {
            axios.post(this.UserTransInfo, loginData).then(function (res) {
                callback(res.data)
            })
        },
        pay: function (paydata) {
            var self = this;
            location.replace("https://wap.beeplay123.com/payment/#/paymentSDK?pay_data=" + encodeURIComponent(JSON.stringify(Object.assign(paydata, {
                gurl: this.gurl,
                pf: this.pfInfo
            }))) + "&wfchannel=" + self.channel + "&wftoken=" + self.Authorization + "&vt=" + new Date().getTime())
        },
        goBack: function () {
            if (this.pfInfo == "wap") {
                location.href = "https://wap.beeplay123.com/wap/home"
            }
            if (this.pfInfo == "jsWap") {
                location.href = "https://wap.beeplay123.com/jsWap"
            }
            if (this.pfInfo == "qmWap") {
                location.href = "https://wap.beeplay123.com/qmWap"
            }
        },
        isNotFirstIn: function () {
            return !location.href.includes('external=1')
        },
        buryingData:function (data) {
            axios.post(this.burydata, data)
        }
    };
    wfGame.extend = wfGame.fn.extend = function (obj) {
        var i = 1, key, arg = arguments, target = arg[0], argLen = arg.length;
        if (argLen === 1) {
            target = this;
            i = 0
        }
        for (; i < argLen; i++) {
            for (key in arg[i]) {
                target[key] = arg[i][key]
            }
        }
        return target
    };
    wfGame.extend({
        isObject: function (obj) {
            if (obj === null) {
                return false
            }
            if (typeof obj === "object" || typeof obj === "function") {
                return true
            }
            return false
        }, getUrlParamObj: function (ename) {
            var url = window.location.href;
            var Request = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.split("?")[1];
                var strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    Request[strs[i].split("=")[0]] = (strs[i].split("=")[1])
                }
            }
            return ename ? (Request[ename] ? Request[ename].split("#")[0] : "") : Request
        }
    });
    var init = wfGame.fn.init = function (selector) {
        var self = this;
        this.channel = selector && wfGame.isObject(selector) && selector.channel || wfGame.getUrlParamObj("channel");
        this.Authorization = selector && wfGame.isObject(selector) && selector.Authorization || wfGame.getUrlParamObj("token");
        this.pfInfo = selector && wfGame.isObject(selector) && selector.pf || (wfGame.getUrlParamObj("pf") || "");
        this.gurl = selector && wfGame.isObject(selector) && selector.gurl || (wfGame.getUrlParamObj('gurl') || '');
        this.gameType =  wfGame.getUrlParamObj("gameType") || wfGame.getUrlParamObj('game_appid');
        localStorage.setItem('APP_CHANNEL', self.channel);
        localStorage.setItem('ACCESS_TOKEN', self.Authorization);
        localStorage.setItem('wj_gameType', self.gameType);
        setTimeout(function() {
            var script = document.createElement("script");
            script.src = 'https://wap.beeplay123.com/ball/index.js?time='+ (new Date()).getTime();
            document.body.appendChild(script);
        }, 1500)
        var script2 = document.createElement("script");
        script2.src = 'https://wap.beeplay123.com/coins/index.js?time='+ (new Date()).getTime();
        document.body.appendChild(script2);

        axios.interceptors.request.use(function (config) {
            config.headers.Authorization = self.Authorization;
            config.headers["App-Channel"] = self.channel;
            config.headers["App-Version"] = "1.0.0";
            return config
        }, function (error) {
            return Promise.reject(error)
        })

        getPointData(axios)


    };
    init.prototype = wfGame.fn;
    w.wfGame = wfGame
}

// var wf_add = [
//     '37.com.cn/h5game/public/?pid=491',
//     'cdn.fyh5.hulai.com/lianyun',
//     'sdk.zhijiangames.com/wanfeng/init/game/frfxz',
//     'kingh5.zhisnet.cn/GameEasySDK',
//     'game.yy2hd.com/website',
//     'sdk.zhijiangames.com/wanfeng/init/game/xxjqxz',
//     'sdk.zhijiangames.com/wanfeng/init/game/dhls',
//     'sssj.beeplay123.com/sssj', //蜀山世界
//     'sdk.zhijiangames.com/wanfeng/init/game/xkx', //侠客行
//     'sssj.beeplay123.com/zll',//醉玲珑
//     'xy-cdn-sgzsh5.suyugame.com/web/xy/index.html'
// ]

// 201 蜀山世界
// 203 逐日战神
// 239 幻想西游
// 223 极品修真
// 234 屠龙破晓
// 240 暴走萌姬
// 204 新仙剑
// 225 清宫无间斗
// 226 神奇三国
// 222 行星裂痕
var wf_game_url = [
    {
        url: 'sssj.beeplay123.com/sssj', //蜀山世界
        name: '蜀山世界',
        id: 201
    },
    {
        url: 'apizrzs.h5.91xy.com/hun/login.php', //逐日战神
        name: '逐日战神',
        id: 203
    },
    {
        url: 'h5sdk-xly.xileyougame.com/index.php/enter/play/wanfeng', //幻想西游
        name: '幻想西游',
        id: 239
    },
    {
        url: 'jpxz.iwanpa.com/games/301044/index.html', //极品修真
        name: '极品修真',
        id: 223
    },
    {
        url: '37.com.cn/h5game/public/?pid=403', //屠龙破晓
        name: '屠龙破晓',
        id: 234
    },
    {
        url: 'bzmj.9wwan.com/yqdq2/index.html', //  暴走萌姬
        name: '暴走萌姬',
        id: 240
    },
    {
        url: 'sdk.zhijiangames.com/wanfeng/init/game/xxjqxz', //  新仙剑
        name: '新仙剑',
        id: 204
    },
    {
        url: 'kingh5.zhisnet.cn/GameEasySDK.html', //清宫无间斗
        name: '清宫无间斗',
        id: 225
    },
    {
        url: 'game.yy2hd.com/website/?gameplatid=15', //  神奇三国
        name: '神奇三国',
        id: 226
    },
    {
        url: 'sharesdk.shishagame.com/api/beeplay123_login.php', //  行星裂痕
        name: '行星裂痕',
        id: 222
    },

    {
        url: 'h5game.ijunhai.com/hero_anyjunhai_djs', //  时光幻境
        name: '时光幻境',
        id: 220
    },

    {
        url: 'mlcdn3.hotgamehl.com/af/v1667', //  梦道
        name: '梦道',
        id: 221
    },
    {
        url: 'web-ljh5.mingchaoyouxi.com/Ljh5ZMServerList.php', //  明朝六界仙尊
        name: '明朝六界仙尊',
        id: 235
    },

    {
        url: 'res.ghc.leduimg.com/online/web32', //  观海策
        name: '观海策',
        id: 238
    },

    {
        url: 'sdk.zhijiangames.com/wanfeng/init/game/dhls', //  大话梁山
        name: '大话梁山',
        id: 232
    },
    {
        url: 'sssj.beeplay123.com/zll', //  醉玲珑
        name: '醉玲珑',
        id: 202
    },
    {
        url: 'sdk.zhijiangames.com/wanfeng/init/game/xkx', //  侠客行
        name: '侠客行',
        id: 205
    },
    {
        url: 'cdn.fyh5.hulai.com/lianyun/ly.html', //  绯雨骑士团
        name: '绯雨骑士团',
        id: 207
    },
    {
        url: 'h5yun.ledu.com/api/index/gameRedirect/1009', //  传奇荣耀
        name: '传奇荣耀',
        id: 208
    },
    {
        url: 'http://h5cqllyx.jiulingwan.com', //  传奇来了
        name: '传奇来了',
        id: 209
    },
    {
        url: 'd.fire2333.com/xdpt/wanfeng/index/2061', //  西游七十二变
        name: '西游七十二变',
        id: 210
    },
    {
        url: 'fa.jygame.net/yssdk/channel/wanfeng/login.html', //  绝世神功
        name: '绝世神功',
        id: 211
    },

    {
        url: 'sdk.zhijiangames.com/wanfeng/init/game/frfxz', //  凡人飞仙传
        name: '凡人飞仙传',
        id: 213
    },
    {
        url: '37.com.cn/h5game/public', //  大天使之剑
        name: '大天使之剑',
        id: 214
    },
    {
        url: 'xy-cdn-sgzsh5.suyugame.com/web/xy/index.html', //  上古诸神
        name: '上古诸神',
        id: 216
    },
    {
        url: 'cdn0.myh5.90wmoyu.com/index.djshps.html', //  魔域来了
        name: '魔域来了',
        id: 242
    },
    {
        url: 'm.yxitai.com/channel/gameplay/game/1088/channelinfo/wanfeng', //  龙城战歌
        name: '龙城战歌',
        id: 244
    },
    {
        url: 'h5download.sbk-h5.com/game/dujiaoshou/dujiaoshou.html', //  沙巴克
        name: '沙巴克',
        id: 252
    },
    {
        url: 'm.yxitai.com/channel/gameplay/game/1120/channelinfo/wanfeng', //  跑跑西游记
        name: '跑跑西游记',
        id: 247
    }


]




function getSingleData() {
    for(var i=0; i< wf_game_url.length; i++) {
        if( window.location.href.indexOf(wf_game_url[i].url ) != -1) {
            return wf_game_url[i]
        }
    }
}




function getPointData(axios) {
    // 用户信息
    axios.post('//uic-api.beeplay123.com/uic/api/user/login/transInfo').then(function(res) {
        if(res.data.code == 200) {
            var userInfo = res.data.data
            // 操作日期
            var date = getNowFormatDate()
            // 操作时间
            var time = getNowFormatTime()
            var initState = {
                event_id: 3600000000,
                event_name: 'H5游戏活跃',
                user_id: userInfo.userId,//用户id
                project_id: getSingleData()&&getSingleData().id,//项目id
                project_name: getSingleData()&&getSingleData().name,//项目名称
                channel_id: localStorage.getItem('APP_CHANNEL'),//渠道id
                generate_date: date,//行为发生日期
                generate_time: time,//行为发生时间
                residual_gold: userInfo.amount//金叶子余额
            }
            console.log('initState::', initState)
            axios.post('https://hadoop-data.beeplay123.com', initState )
        }
    })


}



// 操作日期
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
}
function getNowFormatTime() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var currentdate = PrefixInteger(date.getHours(), 2) + seperator2 + PrefixInteger(date.getMinutes(), 2)
        + seperator2 + PrefixInteger(date.getSeconds(), 2);
    return currentdate;
}

// 不足两位补0
function PrefixInteger(num, length) {
    return (Array(length).join('0') + num).slice(-length);
}

