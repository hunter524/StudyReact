1. 可以通过在Fragment中嵌套React Native的页面进行开发.(实现一块页面中 部分是native 部分是react native页面,是否会导致一个页面嵌套多个react-native页面导致低效的问题)
   https://github.com/hudl/react-native-android-fragment
2. JSX 可以在xml中写JS表达式,但是无法使用JS语句.
3. react-native 命令相当于 在node 环境下运行了 /usr/lib/node_modules/react-native-cli/index.js 的脚本。
    *脚本是怎么直接在 /usr/bin/react-native 下面直接运行的等待研究，其只是一个文件链接*