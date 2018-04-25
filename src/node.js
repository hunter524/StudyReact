//module 和 import的定义
//暂时node无法使用import函数
const import_type = "dev";
let G_fs;
function f() {
    if (import_type === "dev") {
        import("fs").then((fs) => {
            G_fs = fs;
            var dirs = fs.readdirSync(".");
            console.log(dirs);
        })
    }
}
f();
