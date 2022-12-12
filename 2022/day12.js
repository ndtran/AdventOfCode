const fs = require('fs');

try {
    const data = fs.readFileSync('day12.txt', 'UTF-8')
    const lines = data.split("\n")

    let ans1 = 0
    let ans2 = 0
    const nbRow = lines.length
    const nbCol = lines[0].length
    const directions = [[0,1], [0,-1], [1,0], [-1,0]]
    let visited = new Set();
    let queue = []

    // info: Breadth-First Search Algorithm
    function nbOfStepToReachE() {
        while(queue.length > 0) {
            let [r,c,step] = queue.shift()
            
            if (lines[r][c] === 'E') {
                return step
                break
            }
    
            // add neighbours
            for (let i=0; i<directions.length; i++) {
                let [dr,dc] = directions[i]
                let rr = r+dr
                let cc = c+dc
                
                if (rr < 0 || cc < 0 ) continue
                if (rr >= nbRow || cc >= nbCol) continue

                let next = lines[rr][cc].charCodeAt(0)
                let current =  lines[r][c].charCodeAt(0)
                if (lines[r][c] === 'S') current = 'a'.charCodeAt(0)
                if (lines[r][c] === 'E') current = 'z'.charCodeAt(0)
                if (lines[rr][cc] === 'S') next = 'a'.charCodeAt(0)
                if (lines[rr][cc] === 'E') next = 'z'.charCodeAt(0)
                if (next > current + 1) continue

                let position = [rr,cc].join('_')
                if (visited.has(position)) continue
                visited.add(position)
                queue.push([rr,cc,step+1])
            }
        }
    }

    // PART 1
    visited = new Set()
    queue = []
    for (let r=0; r<nbRow; r++) {
        let s = lines[r].indexOf('S')
        if (s < 0) continue
        queue.push([r,s,0])
        break
    }
    ans1 = nbOfStepToReachE()

    // PART 2
    visited = new Set()
    queue = []
    for (let r=0; r<nbRow; r++) {
        for (let c=0; c<nbCol; c++) {
            if (lines[r][c] === 'a') queue.push([r,c,0])
        }
    }
    ans2 = nbOfStepToReachE()
   
    // Answers
    console.log("Part1 - What is the fewest steps required to move from your current position to the location that should get the best signal?", ans1)
    console.log("Part2 - What is the fewest steps required to move starting from any square with elevation a to the location that should get the best signal?", ans2)

} catch (err) {
    console.error(err)
}