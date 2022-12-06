const fs = require('fs');

try {
    const data = fs.readFileSync('day5.txt', 'UTF-8')
    const lines = data.split("\n")

    // [N] [G]                     [Q]    
    // [H] [B]         [B] [R]     [H]    
    // [S] [N]     [Q] [M] [T]     [Z]    
    // [J] [T]     [R] [V] [H]     [R] [S]
    // [F] [Q]     [W] [T] [V] [J] [V] [M]
    // [W] [P] [V] [S] [F] [B] [Q] [J] [H]
    // [T] [R] [Q] [B] [D] [D] [B] [N] [N]
    // [D] [H] [L] [N] [N] [M] [D] [D] [B]
    //  1   2   3   4   5   6   7   8   9 

    let part1 = [
        ['D', 'T', 'W', 'F', 'J', 'S', 'H', 'N'],
        ['H', 'R', 'P', 'Q', 'T', 'N', 'B', 'G'],
        ['L', 'Q', 'V'],
        ['N', 'B', 'S', 'W', 'R', 'Q'],
        ['N', 'D', 'F', 'T', 'V', 'M', 'B'],
        ['M', 'D', 'B', 'V', 'H', 'T', 'R'],
        ['D', 'B', 'Q', 'J'],
        ['D', 'N', 'J', 'V', 'R', 'Z', 'H', 'Q'],
        ['B', 'N', 'H', 'M', 'S']
    ]

    let part2 = [
        ['D', 'T', 'W', 'F', 'J', 'S', 'H', 'N'],
        ['H', 'R', 'P', 'Q', 'T', 'N', 'B', 'G'],
        ['L', 'Q', 'V'],
        ['N', 'B', 'S', 'W', 'R', 'Q'],
        ['N', 'D', 'F', 'T', 'V', 'M', 'B'],
        ['M', 'D', 'B', 'V', 'H', 'T', 'R'],
        ['D', 'B', 'Q', 'J'],
        ['D', 'N', 'J', 'V', 'R', 'Z', 'H', 'Q'],
        ['B', 'N', 'H', 'M', 'S']
    ]

    let nbOfMove = 0
    let from = 0
    let to = 0
    let regex = /\d+/g;

    lines.forEach(line => {
        // move 3 from 1 to 2
        let match = line.match(regex)
        nbOfMove = parseInt(match[0])
        from = parseInt(match[1])
        to = parseInt(match[2])
        // console.log(nbOfMove, from, to)

        // PART 1
        for (let i =0; i<nbOfMove; i++) {
            part1[to -1].push(part1[from - 1].pop())
        }

        // PART 2
        let tmp = []
        for (let i =0; i<nbOfMove; i++) {
            tmp.push(part2[from - 1].pop())
        }
        for (let i =0; i<nbOfMove; i++) {
            part2[to -1].push(tmp.pop())
        }
    })

    let ans1 = part1.map(arr => arr.slice(-1)[0]).join('')
    let ans2 = part2.map(arr => arr.slice(-1)[0]).join('')

    console.log("After the rearrangement procedure completes, what crate ends up on top of each stack?: ")
    console.log("Part 1: " + ans1)
    console.log("Part 2 " + ans2)

} catch (err) {
  console.error(err)
}