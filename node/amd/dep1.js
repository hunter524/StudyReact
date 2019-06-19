function add(a,b){
    console.log("from dep1 a+b:"+(a+b));
}

define(function () {
    return {
        add: add
    }
});