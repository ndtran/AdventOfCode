const fs = require('fs');
const { text } = require('stream/consumers');

try {
    const data = fs.readFileSync('day4.txt', 'UTF-8')
    const lines = data.split("\n")

    let overlappingPart1 = 0
    let overlappingPart2 = 0
  
    lines.forEach(line => {
        let elfs = line.split(',')
        let elf1 = elfs[0].split('-').map(Number)
        let elf2 = elfs[1].split('-').map(Number)

        // PART 1
        if (elf1[0] <= elf2[0] && elf2[1] <= elf1[1] || elf2[0] <= elf1[0] && elf1[1] <= elf2[1]) overlappingPart1 += 1

        // PART 2
        if (!(elf1[1] < elf2[0] || elf2[1] < elf1[0])) overlappingPart2 += 1
    })

    console.log("Part 1 - how many assignment pairs does one range fully contain the other?: " + overlappingPart1)
    console.log("Part 2 - how many assignment pairs do the ranges overlap?: " + overlappingPart2)

} catch (err) {
  console.error(err)
}