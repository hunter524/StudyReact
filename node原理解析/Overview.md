# 概览

## node

node 可执行命令（ELF文件），为所有 node 工具的基础执行环境。源码由 C/C++ 语言编写，直接打包成为 ELF 二进制可执行文件安装在本地供直接运行。
其提供 chrome-v8 等 js 文件执行所需要的核心引擎。

Ubuntu发行版本可以通过 APT 命令搜索 nodejs 程序进行安装。通过包管理器安装 nodejs 需要提前配置软件源参见： <https://nodejs.org/en/download/package-manager/>

也可以可使用 [nvm](https://github.com/nvm-sh/nvm) node 的多版本管理工具进行 node 的版本管理。

## shebang机制

she -> #
bang -> !

JS 文件头添加 #! 同时指定执行程序名称，即可以将该 js 文件当做脚本程序进行运行。（当然任意文件可以指定任意程序进行执行）

[shebang 原理](https://cjting.me/2020/12/10/tiny-x64-helloworld/)

shebang 机制的核心在于其可以使任意 js 脚本当做如同 ELF,SHELL 内置命令一样执行。后面实际上 npm,yarn 等工具也是这么做的。

```shell
#!/usr/bin/env node
```

## npm

npm(Node Package Manager):一个 JS 程序用于管理 node 项目的包依赖。

npm init:在空项目目录下生成 package.json 文件
npm install -D: 添加 dev 依赖
npm install -g: 全局安装依赖
npm install: 添加普通的生产依赖

## package.json

npm,yarn 等包管理工具解析依赖包，运行指定命令的配置文件

## yarn

替代 npm 的另外一种包管理工具，也是由 js 编写的程序工具。

## webpack

webpack-cli:基于 yarn/npm ，node 为基础，由 js 编写的打包工具。

## node 环境的内置变量

__dirname: 代表运行当前 node 程序的工作目录。

__filename: 代表运行当前 node 程序的 js 文件。

process.env:环境变量下的 npm_xxxx 变量，表示 package.json 的一些配置参数。
