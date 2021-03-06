// get-start/GraphiQL.js

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

//定义schema
var schema = buildSchema(`
    type User{
        name: String
        sex: String
        intro: String
    }
    type Query {
        user:User
    }
`);

//定义服务端数据
var root= {
    user: {
        name: 'zhaiqianfeng',
        sex: '男',
        intro: '博主，专注于Linux,Java,nodeJs,Web前端:Html5,JavaScript,CSS3'
    }
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(4000, () => console.log('请在浏览器中打开地址：localhost:4000/graphql'));