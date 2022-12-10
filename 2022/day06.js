const fs = require('fs');
try {
    const data = fs.readFileSync('day06.txt', 'UTF-8')
    const lines = data.split("\n")

    // Part1
    let ans1 = 0
    let lengthP1 = 4
    for(let i=0; i<data.length; i++) {
        if ((new Set(data.substring(i, i+lengthP1).split(''))).size === lengthP1) {
            ans1 = i + lengthP1
            break
        }
    }

    // Part2
    let ans2 = 0
    let lengthP2 = 14 
    for(let i=0; i<data.length; i++) {
        if ((new Set(data.substring(i, i+lengthP2).split(''))).size === lengthP2) {
            ans2 = i + lengthP2
            break
        }
    }

    console.log("How many characters need to be processed before the first start-of-packet marker is detected? ")
    console.log("Part1: " + ans1)
    console.log("Part2: " + ans2)
} catch (err) {
  console.error(err)
}