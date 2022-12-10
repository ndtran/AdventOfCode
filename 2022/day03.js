const fs = require('fs');
const { text } = require('stream/consumers');

try {
    const data = fs.readFileSync('day03.txt', 'UTF-8')
    const lines = data.split(/\r?\n/)
  
    const PRIORITY = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let str1 = ""
    let str2 = ""
    let srt3 = ""
    let tmpLineNumber = 0
    let length = 0
    let letter = ""
    let letters = ""
    let sumPriorities = 0

    function priority(c) {
        // console.log(c, PRIORITY.indexOf(c) + 1)
        return PRIORITY.indexOf(c) + 1
    }

    // PART 1

    lines.forEach(line => {
        length = line.length
        str1 = line.substring(0, length /2)
        str2 = line.substring(length /2)
        
        for (const c of str1) {
            if (str2.indexOf(c) < 0) continue
            letter = c
            break 
        }
        sumPriorities += priority(letter)
    })

    console.log("Sum of the priorities (Part 1): " +sumPriorities )

    // PART 2

    lines.forEach(line => {
       
        if (tmpLineNumber == 0) {
            str1 = line
        } 
        else if (tmpLineNumber == 1) {
            str2 = line
        }
        else if (tmpLineNumber == 2) {
            str3 = line 
            // console.log(str1)
            // console.log(str2)
            // console.log(str3)

            for (const c of str1) {
                if (str2.indexOf(c) < 0) continue
                letters += c 
            }

            for (const c of letters) {
                if (str3.indexOf(c) < 0) continue
                letter = c
                break 
            }
            sumPriorities += priority(letter)
            letters = ""
            letter = ""
        }
        else console.log("should no be here")

        tmpLineNumber = (tmpLineNumber + 1) % 3
    })

    console.log("Sum of the priorities (Part 2): " +sumPriorities )

  } catch (err) {
    console.error(err)
  }