const fs = require('fs');

try {
    const data = fs.readFileSync('day20.txt', 'UTF-8')
    const lines = data.split("\n")

    // PART 1

    let array = lines.map((n,i) => `${n}_${i}`) // number is not unique 
    for (let i=0; i<lines.length; i++) {
        let position = array.indexOf(`${lines[i]}_${i}`)
        let item = array.splice(position,1)[0]
        let n = parseInt(lines[i])        
        position = (position + n) % array.length
        array.splice(position, 0, item)
    }
   
    let zeroIndex = array.indexOf(`0_${lines.indexOf('0')}`)
    let x = array[(zeroIndex + 1000) % array.length].split('_')[0]
    let y = array[(zeroIndex + 2000) % array.length].split('_')[0]
    let z = array[(zeroIndex + 3000) % array.length].split('_')[0]
    console.log(zeroIndex, x, y, z)
    let ans1 = parseInt(x) + parseInt(y) + parseInt(z)
 

    // PART 2

    const decryptionKey = 811589153
    const mixNumber = 10
    const newInput = lines.map(n => n * decryptionKey)
    let array2 = newInput.map((n,i) => `${n}_${i}`) // number is not unique 
    for (let t=0; t<mixNumber; t++) {
        for (let i=0; i<newInput.length; i++) { // same loop as part 1
            let position = array2.indexOf(`${newInput[i]}_${i}`)
            let item = array2.splice(position,1)[0]
            let n = parseInt(newInput[i])        
            position = (position + n) % array2.length
            array2.splice(position, 0, item)
        }
    }

    zeroIndex = array2.indexOf(`0_${lines.indexOf('0')}`)
    x = array2[(zeroIndex + 1000) % array2.length].split('_')[0]
    y = array2[(zeroIndex + 2000) % array2.length].split('_')[0]
    z = array2[(zeroIndex + 3000) % array2.length].split('_')[0]
    console.log(zeroIndex, x, y, z)
    let ans2 = parseInt(x) + parseInt(y) + parseInt(z)

    // Answers
    
    console.log("Part1 - What is the sum of the three numbers that form the grove coordinates?", ans1)
    console.log("Part2 - What is the sum of the three numbers that form the grove coordinates?", ans2)

} catch (err) {
    console.error(err)
}