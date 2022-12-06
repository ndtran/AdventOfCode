const fs = require('fs');
const { text } = require('stream/consumers');

try {
    const data = fs.readFileSync('day6.txt', 'UTF-8')
    const lines = data.split("\n")

    let ans = 0
    // let length = 4 // Part1
    let length = 14 // Part2

    
    for(let i=0; i<data.length-length; i++) {
        let word = data.substring(i, i+length)
        // console.log(word, i)
    
        let tmp = ""
        for(let j=0; j<word.length; j++) {
            // console.log(tmp.indexOf(word[j]) != -1, tmp, word[j])
            if (tmp.indexOf(word[j]) != -1) break
            tmp += word[j]
        }
        if (tmp.length == length) {
            ans = i+length
            break
        }
    }

    console.log("How many characters need to be processed before the first start-of-packet marker is detected? " + ans)
} catch (err) {
  console.error(err)
}