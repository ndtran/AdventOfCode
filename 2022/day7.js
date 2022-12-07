const fs = require('fs');

try {
    const data = fs.readFileSync('day7.txt', 'UTF-8')
    const lines = data.split("\n")

    // dico -> {name: fileDir, size: number}
    let dico = {}
    let path = []

    lines.forEach(line => {
        words = line.split(' ')
        if (words[1] === 'cd') {
            if (words[2] === '..') {
                path.pop()            
            } else {
                path.push(words[2])
            }
        } else if (words[1] === 'ls' || words[0] === 'dir') {
            // nothing
        } else {
            const size = parseInt(words[0])
            let tmpDir = ''
            path.forEach(dir => {
                tmpDir += dir
                if (dico[tmpDir] === undefined) dico[tmpDir] = 0
                dico[tmpDir] += size
            })
        }
    })

    // Part1
    let ans1 = 0
    Object.values(dico).forEach(val => {
        if (val <= 100000) {
            ans1 += val
        }
    });

    // Part2
    const max = 70000000 - 30000000
    const rootSize = dico['/']
    console.log(max, rootSize)
    const needToRemove = rootSize - max

    let ans2 = Infinity
    Object.values(dico).forEach(val => {
        // console.log(val, ans1)
        if (val >= needToRemove) {
            ans2 = Math.min(val, ans2)
        }
    });

    // Answer
    console.log("Part1 - What is the sum of the total sizes of those directories?: " + ans1)
    console.log("Part2 - What is the total size of that directory?: " + ans2)

    } catch (err) {
        console.error(err)
    }