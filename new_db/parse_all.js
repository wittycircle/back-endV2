
    fs = require('fs');

    let names = ['first', 'second', 'third', 'fourth', 'fifth'];
    let files = names.map(e => `./fill_tables/${e}_import.js`);
    let results = [];

let tes = {};

let testing = () => {
  files.forEach((file, i) => {
    tes[names[i]] = `\x1b[3${i + 1}m`

      fs.readFile(file, (err, data) => {
        let array = data.toString().split(","),
        re = /- (.*) -+\s+old\('(\S*).*'\)/gm;
        for(j in array) {
          if (x = re.exec(array[j]))
          results.push({name : names[i], old: x[2], new: x[1]})
        }
      });
    })//foreach
}

  const parse = () => {
    results.forEach(e => {
      if (e.old !== e.new){
        console.log(tes[e.name])
        console.log(`${e.name}:\t\t${e.old} -> ${e.new}`)
      }
      else {
        console.log(tes[e.name])
        console.log(`${e.name}:\t\t${e.old}`)
        }
    })
    // console.log(results.length)
};

  testing();
  setTimeout(parse, 500);
