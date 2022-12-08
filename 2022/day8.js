const fs = require('fs');

try {
    const data = fs.readFileSync('day8.txt', 'UTF-8')
    const lines = data.split("\n")

    const maxLength = lines.length-1

    // PART 1

    let ans1 = 0
    function isVisible(val, posX, posY, dirX, dirY) {
        if (dirX != 0) {
         let dx = posX + dirX*1
            while (dx >= 0 && dx <= maxLength) {
                if (val <= parseInt(lines[dx][posY])) return false
                dx += dirX*1
            }
        }
        if (dirY != 0) {
            let dy = posY + dirY*1
            while (dy >= 0 && dy <= maxLength) {
                if (val <= parseInt(lines[posX][dy])) return false
                dy += dirY*1
            }
        }   
        return true
    }

    for(let i=0; i<lines.length; i++) {
        for(let j=0; j<lines[0].length; j++) {
            let n = parseInt(lines[i][j])
            if (isVisible(n, i, j, 0, -1)) ans1 += 1
            else if (isVisible(n, i, j, 0, 1)) ans1 += 1
            else if (isVisible(n, i, j, -1, 0)) ans1 += 1
            else if (isVisible(n, i, j, 1, 0)) ans1 += 1
        }
    }
    
    // PART 2

    let ans2 = 0
    function nbOfVisible(val, posX, posY, dirX, dirY) {
        let count = 0    
        if (dirX != 0) {
            let dx = posX + dirX*1
            while (dx >= 0 && dx <= maxLength) {
                count++
                if (val <= parseInt(lines[dx][posY])) break
                dx += dirX*1
            }
        }
        if (dirY != 0) {
            let dy = posY + dirY*1
            while (dy >= 0 && dy <= maxLength) {
                count++
                if (val <= parseInt(lines[posX][dy])) break
                dy += dirY*1
            }
        }   
        return count
    }
    
    for(let i=0; i<lines.length; i++) {
        for(let j=0; j<lines[0].length; j++) {
            let n = parseInt(lines[i][j])
            ans2 = Math.max(nbOfVisible(n, i, j, 0, -1) * nbOfVisible(n, i, j, 0, 1) * nbOfVisible(n, i, j, -1, 0) * nbOfVisible(n, i, j, 1, 0), ans2)
        }
    }

    // Answer
    console.log("Part1 - how many trees are visible from outside the grid? " + ans1)
    console.log("Part2 - What is the highest scenic score possible for any tree? " + ans2)

    } catch (err) {
        console.error(err)
    }