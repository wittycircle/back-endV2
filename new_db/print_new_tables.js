const {db, TABLES} = require('../app/models/index');
const fs = require('fs');

let y = []
fs.readdir('./', (err, files) => {
    files.forEach(file => {
        fs.readFile(`./${file}`, (err, data) => {
            let array = data.toString().split("\n"), 
            re = /(?:Exists)\((.*),/g;
            for(i in array) {
                if (x = re.exec(array[i])){
                    y.push(file, x[1])
                }
            }
        });
    })//foreach
})

let tes  = {
    "main_tables.js": "\x1b[32m",
    "secondary_tables.js":  "\x1b[33m",
    "ternary_tables.js": "\x1b[34m",
    "quaternary_tables.js": "\x1b[35m",
    "quinary_tables.js": "\x1b[36m",
}
console.log("// ------------------ file lookup ------------------")
for (k in tes){
    console.log(tes[k], k)
}
console.log("// ------------------  ------------------")

let bla = () => {
    let color = ''
    y.forEach((e, i) => {
        if (!(i % 2)){
            color = tes[e];

        }else {
            console.log(color, e)
        }
    })
    // console.log(y)
}
setTimeout(bla, 500)