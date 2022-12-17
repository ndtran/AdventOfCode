const fs = require('fs');

try {
    const data = fs.readFileSync('day17.txt', 'UTF-8')
    const streams = data.split("")
    const s_size = streams.length
    let s_index = 0

    let ans1 = 0
    let ans2 = 0
    
    const rock1 = ["|..@@@@.|"]
    const rock2 = ["|...@...|", "|..@@@..|", "|...@...|"]
    const rock3 = ["|..@@@..|", "|....@..|", "|....@..|"]
    const rock4 = ["|..@....|", "|..@....|", "|..@....|", "|..@....|"]
    const rock5 = ["|..@@...|", "|..@@...|"]
    let rocks = [rock1, rock2, rock3, rock4, rock5]
    let rock_index = 0

    const floor = "+-------+"
    const stage = "|.......|"
    let chamber = [floor, stage]

    let maxRockFalling = 2022
    let step = 0
    let falling_rock_index = 0
    let isRockFalling = true

    function draw() {
        for (let i=chamber.length-1; i>=0; i--) {
            console.log(chamber[i])
        }
    }

    function newStage() {
        rock_index = step % rocks.length // next rock
        isRockFalling = true

        falling_rock_index = chamber.indexOf(stage)
        if (falling_rock_index >= 0) chamber = chamber.slice(0, chamber.indexOf(stage))
        chamber.push(stage)
        chamber.push(stage)
        chamber.push(stage)
        falling_rock_index += 3
        let r = rocks[rock_index]
        for (let i=0; i<r.length; i++) {
            chamber.push(r[i])
        }
    }

    function streamStep(lowerFallingIndex) {
        let shadowR = chamber.slice(lowerFallingIndex, chamber.length)
        let mv_right = true
        if (streams[s_index] === "<") mv_right = false

        let isValid = true
        for (let i=0; i<shadowR.length; i++) {
            if (!shadowR[i].includes("@")) break
    
            if (mv_right) {
                let firstP = shadowR[i].indexOf("@")
                let p = shadowR[i].indexOf("@.")
                if (p >= 0) {
                    shadowR[i] = shadowR[i].slice(0, firstP) + '.' + shadowR[i].slice(firstP, p+1) + shadowR[i].slice(p+2)
                } else isValid = false
            }
            else {
                let p = shadowR[i].indexOf(".@")
                let lastP = shadowR[i].lastIndexOf("@")
                if (p >= 0) {
                    shadowR[i] = shadowR[i].slice(0, p) + shadowR[i].slice(p+1, lastP+1) + '.' + shadowR[i].slice(lastP+1)
                } else isValid = false
                
            }
            if (!isValid) break
        }

        if (isValid) chamber = [...chamber.slice(0,lowerFallingIndex), ...shadowR]
        s_index = (s_index + 1) % s_size // next stream
    }

    function setCharAt(str, index, chr) {
        if (index > str.length-1) return str
        return str.substring(0,index) + chr + str.substring(index+1)
    }

    function fallingStep(lowerFallingIndex) {
        let shadowR = chamber.slice(lowerFallingIndex-1, chamber.length)
        let isValid = true

        for (let i=0; i<shadowR.length-1; i++) {
            for (let j=0; j<shadowR[0].length; j++) {
                if (shadowR[i+1][j] !== "@") continue
                if (shadowR[i][j] === "#" || shadowR[i][j] === "-") {
                    isValid = false
                    break
                }
                if (shadowR[i][j] === ".") {
                    shadowR[i] = setCharAt(shadowR[i], j, "@")
                    shadowR[i+1] = setCharAt(shadowR[i+1], j, ".")
                }
            }
            if (!isValid) break
        }

        if (isValid) {
            chamber = [...chamber.slice(0,lowerFallingIndex-1), ...shadowR]
            if (chamber[chamber.length] === stage) chamber.pop()
            falling_rock_index -= 1
        } else {
            for (let i=lowerFallingIndex; i<chamber.length; i++) {
                chamber[i] = chamber[i].replace(/@/g, "#")
            }
            isRockFalling = false
        } 
    }

    // PART 1

    while (step<maxRockFalling) {
        newStage()
        while (isRockFalling) {
            streamStep(falling_rock_index)
            fallingStep(falling_rock_index)
        }
        step++
    }
    ans1 = chamber.indexOf(stage) - 1 // remove the ground

    // PART 2

    // TBD

    // Answers
    
    console.log("Part1 - How many units tall will the tower of rocks be after 2022 rocks have stopped falling?", ans1)
    console.log("Part2 - How tall will the tower be after 1000000000000 rocks have stopped?", ans2)

} catch (err) {
    console.error(err)
}