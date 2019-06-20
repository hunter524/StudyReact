function add(a,b){
    console.log("from dep1 a+b:"+(a+b));
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

define(function () {
    return syncGetModule()
});