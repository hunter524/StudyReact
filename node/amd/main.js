require(['dep1'],function (dep1) {
    console.log("from main call dep1#add:"+(dep1.add(3,4)));
    console.log("define:",define)
});