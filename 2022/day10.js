const fs = require('fs');

try {
    const data = fs.readFileSync('day10.txt', 'UTF-8')
    const lines = data.split("\n")

    let c = 0 // cycle 
    let x = 1 // register

    // variable for PART 1
    let cycles = [20, 60, 100, 140, 180, 220]
    let ans1 = 0

    // variable for Part 2
    let draw = ''
    let ans2 = []

    function signalStrength() {
        if (cycles.includes(c)) ans1 += x * c
    }

    function drawPixel() {
        let crtPosition = c%40
        if (crtPosition === 0) {
            ans2.push(draw)
            draw = ''
        }
        else if (crtPosition >= x && crtPosition < x+3) draw += '#'
        else draw += '.'   
    }

    function nextCycle() {
        c += 1
        signalStrength() // Part 1
        drawPixel() // Part 2
    }

    lines.forEach(line => {
        let [command, n] = line.split(' ')
        if (command === 'addx') {
            nextCycle()
            nextCycle()
            x += parseInt(n)
        } else if (command === 'noop') {
            nextCycle()
        }
    })

    // Answers
    console.log("Part1 - What is the sum of these six signal strengths? ", ans1)
    console.log("Part2 - What eight capital letters appear on your CRT?", ans2)

    } catch (err) {
        console.error(err)
    }