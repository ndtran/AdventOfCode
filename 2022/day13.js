const fs = require('fs');

try {
    const data = fs.readFileSync('day13.txt', 'UTF-8')
    const lines = data.split("\n\n")

    let ans1 = 0
    let ans2 = 1

    function compare(a, b) {
        if (typeof a === 'number' && typeof b === 'number') {
            if (a < b) return 1
            if (a > b) return -1
            return 0
        }
        else if (typeof a === typeof b) {
            let i=0
            while (a.length > i && b.length > i) {
                let c = compare(a[i],b[i])
                if (c < 0) return -1
                if (c > 0) return 1
                i++
            }
            
            if (a.length < b.length) return 1
            if (a.length > b.length) return -1
            else return 0
        }
        else if (typeof a === 'number') return compare([a], b)
        else if (typeof b === 'number') return compare(a, [b])
    }

    // PART 1

    let packets = []
    for (let i=0; i<lines.length; i++) {
        let [a1, a2] = lines[i].split('\n')
        let p1 = JSON.parse(a1)
        let p2 = JSON.parse(a2)
        let v = compare(p1, p2)
        if (v > 0) ans1 += i+1

        // for Part2
        packets.push(p1)
        packets.push(p2)
    }

    // PART 2

    packets.push([[2]])
    packets.push([[6]])
    packets.sort((a,b) => compare(a,b)).reverse()
    for (let i=0; i<packets.length; i++) {
        if (packets[i].toString() === [[2]].toString() || packets[i].toString() === [[6]].toString()) ans2 *= i+1 
    }

    // Answers
    console.log("Part1 -What is the sum of the indices of those pairs?", ans1)
    console.log("Part2 - What is the decoder key for the distress signal?", ans2)

} catch (err) {
    console.error(err)
}