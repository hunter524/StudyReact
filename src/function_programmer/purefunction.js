// const _l    = require("lodash")
// const Axios = require("axios")

import _l from "lodash"
import Axios from "axios";

//

var squareNumber = _l.memoize(function (x) {
    return x * x;
});

squareNumber(4);
//=> 16

squareNumber(4); // 从缓存中读取输入值为 4 的结果
//=> 16

squareNumber(5);
//=> 25

squareNumber(5); // 从缓存中读取输入值为 5 的结果
//=> 25

var jsonApi1 = "https://wanandroid.com/wxarticle/chapters/json";
// Axios.get(jsonApi1).then(function (resp) {
//     console.log(resp.data)
// })

var jsonApi1     = "https://wanandroid.com/wxarticle/chapters/json";
// _l means lodash
var pureHttpCall = _l.memoize(function (url) {
    return function () {
        return Axios.get(url);
    }
});

// var jsonApi1     = "https://wanandroid.com/wxarticle/chapters/json";
// // 两个严格相等则是从 cache 缓存中获取到的相同的方法
// console.log("is from cache:" + (pureHttpCall(jsonApi1) === pureHttpCall(jsonApi1)))
// // is from cache:true
// pureHttpCall(jsonApi1)().then(function (resp) {
//     console.log("Request From Cache======")
//     console.log(resp.data)
// })

// Request From Cache======
// {
//     data: [
//         {
//             children: [],
//             courseId: 13,
//             id: 408,
//             name: '鸿洋',
//             order: 190000,
//             parentChapterId: 407,
//             userControlSetTop: false,
//             visible: 1
//         },
//         {
//             children: [],
//             courseId: 13,
//             id: 409,
//             name: '郭霖',
//             order: 190001,
//             parentChapterId: 407,
//             userControlSetTop: false,
//             visible: 1
//         },
//         {
//             children: [],
//             courseId: 13,
//             id: 410,
//             name: '玉刚说',
//             order: 190002,
//             parentChapterId: 407,
//             userControlSetTop: false,
//             visible: 1
//         },
//         {
//             children: [],
//             courseId: 13,
//             id: 411,
//             name: '承香墨影',
//             order: 190003,
//             parentChapterId: 407,
//             userControlSetTop: false,
//             visible: 1
//         },
//         {
//             children: [],
//             courseId: 13,
//             id: 413,
//             name: 'Android群英传',
//             order: 190004,
//             parentChapterId: 407,
//             userControlSetTop: false,
//             visible: 1
//         },
//         {
//             children: [],
//             courseId: 13,
//             id: 414,
//             name: 'code小生',
//             order: 190005,
//             parentChapterId: 407,
//             userControlSetTop: false,
//             visible: 1
//         },
//         {
//             children: [],
//             courseId: 13,
//             id: 415,
//             name: '谷歌开发者',
//             order: 190006,
//             parentChapterId: 407,
//             userControlSetTop: false,
//             visible: 1
//         },
//         {
//             children: [],
//             courseId: 13,
//             id: 416,
//             name: '奇卓社',
//             order: 190007,
//             parentChapterId: 407,
//             userControlSetTop: false,
//             visible: 1
//         },
//         {
//             children: [],
//             courseId: 13,
//             id: 417,
//             name: '美团技术团队',
//             order: 190008,
//             parentChapterId: 407,
//             userControlSetTop: false,
//             visible: 1
//         },
//         {
//             children: [],
//             courseId: 13,
//             id: 420,
//             name: 'GcsSloop',
//             order: 190009,
//             parentChapterId: 407,
//             userControlSetTop: false,
//             visible: 1
//         },
//         {
//             children: [],
//             courseId: 13,
//             id: 421,
//             name: '互联网侦察',
//             order: 190010,
//             parentChapterId: 407,
//             userControlSetTop: false,
//             visible: 1
//         },
//         {
//             children: [],
//             courseId: 13,
//             id: 427,
//             name: 'susion随心',
//             order: 190011,
//             parentChapterId: 407,
//             userControlSetTop: false,
//             visible: 1
//         },
//         {
//             children: [],
//             courseId: 13,
//             id: 428,
//             name: '程序亦非猿',
//             order: 190012,
//             parentChapterId: 407,
//             userControlSetTop: false,
//             visible: 1
//         },
//         {
//             children: [],
//             courseId: 13,
//             id: 434,
//             name: 'Gityuan',
//             order: 190013,
//             parentChapterId: 407,
//             userControlSetTop: false,
//             visible: 1
//         }
//     ],
//     errorCode: 0,
//     errorMsg: ''
// }
// const Immutable = require("immutable")
import Immutable from "immutable"


var decrementHP = function(player) {
    return player.set("hp", player.get("hp")-1);
};

var isSameTeam = function(player1, player2) {
    return player1.get("team") === player2.get("team");
};

var punch = function(player, target) {
    if(isSameTeam(player, target)) {
        return target;
    } else {
        return decrementHP(target);
    }
};

var jobe = Immutable.Map({name:"Jobe", hp:20, team: 'red'});
var michael = Immutable.Map({name:"Michael", hp:20, team: 'green'});

console.log(JSON.stringify(punch(jobe, michael)));
//=> Immutable.Map({name:"Michael", hp:19, team: "green"})




