const fs = require('fs');

try {
    const data = fs.readFileSync('day01.txt', 'UTF-8')
    const lines = data.split(/\r?\n/)
  
    const elfs = []
    var tmp = 0

    lines.forEach(line => {
      // console.log(line)
      if (!isNaN(line) && line !== "") {
        tmp += parseInt(line)
      } else {
        elfs.push(tmp)
        tmp = 0
      }
    })

    // PART 1

    const max_val = Math.max(...elfs)
    const max_index = elfs.indexOf(max_val)
    console.log("Max value index is: " + (max_index + 1))
    console.log("Max value Calories is: " + max_val)

    // PART 2

    elfs.sort().reverse()
    const top3 = [elfs[0], elfs[1],elfs[2]]
    console.log(top3)
    console.log("Total of 3 = " + top3.reduce((acc, cur) => acc + cur, 0))


  } catch (err) {
    console.error(err)
  }