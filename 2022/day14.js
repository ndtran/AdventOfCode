const fs = require('fs');

try {
    const data = fs.readFileSync('day14.txt', 'UTF-8')
    const lines = data.split("\n")

    let ans1 = 0
    let ans2 = 0
    let size = 1000
    let map = Array(size).fill('.').map(x => Array(size).fill('.')) // map[Column][Row]
    const startPoint = [500, 0]
    let end = false
    let highestRow = 0

    // MAP

    function drawLine(p1, p2) {
        let [c1, r1] = p1.map(p => parseInt(p))
        let [c2, r2] = p2.map(p => parseInt(p))

        let d = [0,0]
        if (r1 > r2) d[1] = -1
        if (r1 < r2) d[1] = 1
        if (c1 > c2) d[0] = -1
        if (c1 < c2) d[0] = 1

        while (r1!==r2 || c1!==c2) {
            map[c1][r1] = '#'
            r1 += d[1]
            c1 += d[0]
        }
        map[c1][r1] = '#'

        // for part 2
        if (r1 > highestRow) highestRow = r1
        if (r2 > highestRow) highestRow = r2
    }

    lines.forEach(line => {
        let c = line.split(" -> ").map(c => c.split(","))
        for (let i=1;i<c.length;i++) { drawLine(c[i-1], c[i]) }
    })

    function updateMap(partNumber) {
        const d = [[0,1], [-1,0], [1,0]]
        let [sc, sr] = startPoint
        while(true) {
            if (partNumber === 1 && sr >= size - 1) {
                // we touch the abyss
                end = true
                break
            }
            else if (map[sc + d[0][0]][sr + d[0][1]] === '.') {
                // go down
                sc += d[0][0]
                sr += d[0][1]
            }
            else if (map[sc + d[0][0] + d[1][0]][sr + d[0][1] + d[1][1]] === '.') {
                // go down left
                sc += d[0][0] + d[1][0]
                sr += d[0][1] + d[1][1]
            } 
            else if (map[sc + d[0][0] + d[2][0]][sr + d[0][1] + d[2][1]] === '.') {
                // go down right
                sc += d[0][0] + d[2][0]
                sr += d[0][1] + d[2][1]
            } 
            else {
                map[sc][sr] = 'o'
                if (map[startPoint[0]][startPoint[1]] === 'o') end = true
                break
            } 
        }
    }

    // PART1

    while(!end) {
        ans1 += 1
        updateMap(1)
    }
    ans1 -= 1 // remove the last step

    // PART2

    highestRow += 2
    end = false
    for (let i=0; i<size; i++) {
        map[i][highestRow] = '#'
    }
    while(!end) {
        ans2 += 1
        updateMap()
    }
    ans2 += ans1 // add what was done in part 1

    // Answers
    
    console.log("Part1 - How many units of sand come to rest before sand starts flowing into the abyss below?", ans1)
    console.log("Part2 - How many units of sand come to rest?", ans2)

} catch (err) {
    console.error(err)
}