'use strict'
// process#env 可以用来读取常用的一些内置的环境变量
// process#env#NODE_ENV 通常用来设置为 development production

console.log("============================= env ==========================")

for (const key in process.env) {
    console.log(`Process Env Key ${key} = ${process.env[key]}`)
}

let keys = Object.keys(process.env);
let keyString = keys.reduce((previousValue, currentValue) => {
    return `${previousValue}|${currentValue}`
})
console.log(keyString)

console.log(process.env.NODE_ENV)

// argv 0 是执行 node 命令的 node 程序的完整目录 如 : /usr/bin/node
// argv 1 则是 node 命令运行的 js  脚本所在的完整的目录 如:/home/hunter/WebstormProjects/StudyReact/node/api/processEnv.js
// arg 2 到 n 则是用户 输入的参数,每个参数用空格隔开 如输入:node processEnv.js 1 2 3 则得到的参数分别为 1 2 3


console.log(`======================== argv ==============================`)

console.log(`process#argv size: ${process.argv.length}`)

process.argv.forEach((value, index) => {
    console.log(`argv at ${index} = ${value}`)
})

