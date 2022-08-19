// 基于闭包的对象私有属性
function PrivateProperty(){
    let _a = "private a";
    let _b = "private b";

    return {
        getA(){
            return _a;
        },

        setA(a){
            _a = "this a from setA:"+a;
        }
    }
}

let privateProperty = PrivateProperty();
console.log(privateProperty.getA());
privateProperty.setA("Other A");
console.log(privateProperty.getA());

let _undefined = undefined