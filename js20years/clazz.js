class Clazz  extends Array{

    name="Class Type Field"

    constructor() {
        super(10);
    }
}

let clazz = new Clazz();
let clazz2 = new Clazz();
clazz2.name = "Class Type Field 2"
console.log(JSON.stringify(clazz));
console.log(clazz.name);
console.log(clazz2.name);
console.log(Clazz.prototype);

