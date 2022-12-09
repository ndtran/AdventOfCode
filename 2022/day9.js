const fs = require('fs');

try {
    const data = fs.readFileSync('day9.txt', 'UTF-8')
    const lines = data.split("\n")

    // variable for PART 1
    let H = [0,0]
    let T = [0,0]
    let H_path = []
    let T_path = []

    // variable for PART 2
    let knots = Array.from({ length: 10 }, (_, i) => [0,0])
    let knots_tail_path = []
    

    function moveTo(d, H) {
        switch (d) {
            case 'R': H[0] += 1; break;
            case 'U': H[1] += 1; break;
            case 'L': H[0] -= 1; break;
            case 'D': H[1] -= 1; break;
        }
    } 

    function follow(A, withB) {
        let dx = A[0] - withB[0]
        let dy = A[1] - withB[1]
        if (Math.abs(dx) + Math.abs(dy) > 2) {
            withB[0] += 1 * dx / Math.abs(dx)
            withB[1] += 1 * dy / Math.abs(dy)
        }
        else if (Math.abs(dx) > 1) withB[0] += 1 * dx / Math.abs(dx)
        else if (Math.abs(dy) > 1) withB[1] += 1 * dy / Math.abs(dy)
    }

    lines.forEach(line => {
        let [d, steps] = line.split(' ')
        for(let i=0; i<steps; i++) {

            // PART 1
            moveTo(d, H)
            H_path.push([...H])

            follow(H, T)
            T_path.push([...T])

            // PART 2
            moveTo(d, knots[0])
            for (let k=1; k<knots.length; k++) {
                follow(knots[k-1], knots[k])
            }
            knots_tail_path.push([...knots[knots.length-1]])
        }
    })
    
    let ans1 = (new Set(T_path.map(p => "x" + p[0] + "y" + p[1]))).size
    let ans2 = (new Set(knots_tail_path.map(p => "x" + p[0] + "y" + p[1]))).size

    // Answers
    console.log("Part1 - How many positions does the tail of the rope visit at least once? " + ans1)
    console.log("Part2 - How many positions does the tail of the rope visit at least once? " + ans2)

    } catch (err) {
        console.error(err)
    }