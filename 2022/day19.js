const fs = require('fs')

try {
    const data = fs.readFileSync('day19.txt', 'UTF-8')
    const lines = data.split('\n')
    let regex = /[+-]?\b[0-9]+\b/g;

    let ans1 = 0
    let ans2 = 0

    // info: greedy algo won't work as we will miss the optimal solution. The goal, create geode robot in less time

    lines.forEach((line) => {
        let visited = new Set();
        let queue = []
        let ressource = []
        let t = 24
        let [index, oreCost, clayCost, obsidianOreCost, obsidianClayCost, geodeOreCost, geodeObsidianCost] = line.match(regex).map(i => parseInt(i))

    })

    // PART 1
   

    // PART 2



    // Answers
    console.log('Part1 - What do you get if you add up the quality level of all of the blueprints in your list?', ans1)
    console.log('Part2 - ', ans2)
} catch (err) {
    console.error(err)
}
