'use strict'
let stdin = process.stdin;
stdin.on("readable",()=>{
    while (true){
        let read = stdin.read(5);
        if (read != null){
            console.log("read in:"+read)
        }
    }
})