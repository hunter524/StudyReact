const http = require('http')
// __dirname/__filename 为 nodejs 内置的环境变量
// 分别表示当前执行 js 脚本所在的目录,以及 js 文件的路径
console.log("__dirname",__dirname,"__filename",__filename)
const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
    console.log("http req url:",req.url,"readable:",req.readable,req.readableLength)
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('hello')
})

server.listen(port, hostname, () => {
    console.log(`服务器运行在 http://${hostname}:${port}/`)
})
