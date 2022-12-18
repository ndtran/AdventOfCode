const fs = require('fs')

try {
    const data = fs.readFileSync('day18.txt', 'UTF-8')
    const lines = data.split('\n')

    let ans1 = 0
    let ans2 = 0

    let cubes = []
    let adjacentCubes = []
    let acTimes = 0
    let ac = [
        [1, 0, 0],
        [-1, 0, 0],
        [0, 1, 0],
        [0, -1, 0],
        [0, 0, 1],
        [0, 0, -1],
    ]

    lines.forEach((line) => {
        let [x, y, z] = line.split(',').map((i) => parseInt(i))

        cubes.push(line)
        for (let i = 0; i < ac.length; i++) {
            let adjacentCube = [x + ac[i][0], y + ac[i][1], z + ac[i][2]].join()
            adjacentCubes.push(adjacentCube)
        }
    })

    // PART 1
    ans1 = adjacentCubes.filter((i) => !cubes.includes(i)).length

    // PART 2

    // TBD
    // ans2 = adjacentCubes
    //     .filter((i) => !cubes.includes(i))
    //     .filter((c) => {
    //         let [x, y, z] = c.split(',').map((i) => parseInt(i))
    //         let n = 0
    //         for (let i = 0; i < ac.length; i++) {
    //             let adjacentCube = [x + ac[i][0], y + ac[i][1], z + ac[i][2]].join()
    //             if (adjacentCubes.includes(adjacentCube)) n += 1
    //             else if (cubes.includes(adjacentCube)) n += 1
    //         }
    //         return n !== 6
    //     }).length

    // Answers
    console.log('Part1 - What is the surface area of your scanned lava droplet?', ans1)
    console.log('Part2 - What is the exterior surface area of your scanned lava droplet?', ans2)
} catch (err) {
    console.error(err)
}
