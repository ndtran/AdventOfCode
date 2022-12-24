const fs = require('fs')

try {
    const data = fs.readFileSync('day23.txt', 'UTF-8')
    const lines = data.split('\n')

    let elves = {} // { 'row_col': previousPos}
    let nbElve = 0
    let positionToRollback = new Set()
    let positionToCleanup = []
    const move = { N: [-1, 0], NE: [-1, 1], NW: [-1, -1], S: [1, 0], SE: [1, 1], SW: [1, -1], W: [0, -1], E: [0, 1] }
    const adjacent = { N: ['N', 'NE', 'NW'], S: ['S', 'SE', 'SW'], W: ['W', 'NW', 'SW'], E: ['E', 'NE', 'SE'] }
    const proposeMove = ['N', 'S', 'W', 'E']

    /* EXTRACT DATA */

    for (let row = 0; row < lines.length; row++) {
        lines[row].split('').forEach((c, i) => {
            if (c === '#') {
                let position = `${row}_${i}`
                elves[position] = `${position}::0`
                nbElve += 1
            }
        })
    }

    function moveTo(direction, row, col, round) {
        let [r, c] = move[direction]
        let position = `${row}_${col}`
        let newPosition = `${row + r}_${col + c}`
        if (!elves[newPosition]) {
            elves[newPosition] = `${position}::${round}`
            positionToCleanup.push(position)
        } else positionToRollback.add(newPosition)
    }

    function rollback() {
        positionToRollback.forEach((position) => {
            let previousPosition = elves[position].split('::')[0]
            elves[previousPosition] = elves[position]
            delete elves[position]
        })
        positionToRollback.clear()
    }

    function cleanup() {
        positionToCleanup.forEach((position) => {
            delete elves[position]
        })
        positionToCleanup = []
    }

    function executRound(round) {
        let allElvesNotMoving = true
        Object.keys(elves).forEach((elve) => {
            let [row, col] = elve.split('_').map((p) => parseInt(p))

            let directionToMove
            let noElvesArround = true // no other Elves are in one of those eight positions, the Elf does not do anything during this round.
            for (let i = 0; i < 4; i++) {
                let d = proposeMove[(round + i) % 4]

                let a = adjacent[d]
                let canMoveToDirection = true
                for (let j = 0; j < a.length; j++) {
                    let [r, c] = move[a[j]]
                    let position = `${row + r}_${col + c}`
                    if (elves[position] && parseInt(elves[position].split('::')[1]) < round + 1) canMoveToDirection = false
                    if (noElvesArround && !canMoveToDirection) noElvesArround = false
                }

                if (!directionToMove && canMoveToDirection) directionToMove = d
            }
            if (!noElvesArround && directionToMove) {
                allElvesNotMoving = false
                moveTo(directionToMove, row, col, round + 1)
            }
        })
        cleanup()
        rollback()

        return allElvesNotMoving // for part 2
    }

    function nbOfGround() {
        let [min_row, max_row] = [Infinity, 0]
        let [min_col, max_col] = [Infinity, 0]

        Object.keys(elves).forEach((elve) => {
            let [row, col] = elve.split('_').map((p) => parseInt(p))

            if (row > max_row) max_row = row
            if (col > max_col) max_col = col
            if (row < min_row) min_row = row
            if (col < min_col) min_col = col
        })
        let nbRow = Math.abs(min_row) + max_row + 1
        let nbCol = Math.abs(min_col) + max_col + 1
        return nbRow * nbCol - nbElve
    }

    function draw() {
        let [min_row, max_row] = [Infinity, 0]
        let [min_col, max_col] = [Infinity, 0]

        Object.keys(elves).forEach((elve) => {
            let [row, col] = elve.split('_').map((p) => parseInt(p))

            if (row > max_row) max_row = row
            if (col > max_col) max_col = col
            if (row < min_row) min_row = row
            if (col < min_col) min_col = col
        })

        let nbRow = Math.abs(min_row) + max_row + 1
        let nbCol = Math.abs(min_col) + max_col + 1
        let map = Array(nbRow)
            .fill('.')
            .map((x) => Array(nbCol).fill('.'))

        Object.keys(elves).forEach((elve) => {
            let elvePosition = elve.split('_')
            let row = parseInt(elvePosition[0])
            let col = parseInt(elvePosition[1])
            map[Math.abs(min_row) + row][Math.abs(min_col) + col] = '#'
        })

        map.forEach((line) => console.log(line.join('')))
    }

    /* PART 1 && PART 2 */

    let ans1 = 0
    let ans2 = 0
    while (!executRound(ans2)) {
        if (ans2 === 10) ans1 = nbOfGround()
        ans2++
    }
    ans2++ // add the last step
    // draw()
    // Answers

    console.log('Part1 - How many empty ground tiles does that rectangle contain?', ans1)
    console.log('Part2 - What is the number of the first round where no Elf moves?', ans2)
} catch (err) {
    console.error(err)
}
