function add(a,b){
    console.log("from dep1 a+b:"+(a+b));
    return a+b;
}
console.log("amd loading dep1");

async function asyncGetModule(){
    return {
        add: add
    }
}

function syncGetModule(){
    return {
        add: add
    }
}

define(['dep2'],function (dep2) {
    console.log("call amd dep1 factory");
    dep2.bar();
    return syncGetModule()
});