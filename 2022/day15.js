const fs = require('fs');

try {
    const data = fs.readFileSync('day15.txt', 'UTF-8')
    const lines = data.split("\n")

    let ans1 = 0
    let ans2 = 0
    let regex = /[+-]?\b[0-9]+\b/g;

    // info: comment below because Drawing everything it too big so we need another solution

    // let positions = [] // [[sensorX, sensorY, beaconX, beaconY, md]]
    // let minX = Infinity
    // let maxX = -Infinity
    // let minY = Infinity
    // let maxY = -Infinity
    // let maxMd = 0
    
    // lines.forEach(line => {
    //     let p = line.match(regex).map(x => parseInt(x))
    //     let d = Math.abs(p[0] - p[2]) + Math.abs(p[1] - p[3]) 
    //     if (p[0] > maxX) maxX = p[0]
    //     if (p[2] > maxX) maxX = p[2]
    //     if (p[0] < minX) minX = p[0]
    //     if (p[2] < minX) minX = p[2]
    //     if (p[1] > maxY) maxY = p[1]
    //     if (p[3] > maxY) maxY = p[3]
    //     if (p[1] < minY) minY = p[1]
    //     if (p[3] < minY) minY = p[3]
    //     if (d > maxMd) maxMd = d

    //     p.push(d)
    //     positions.push(p)
    // })

    // let translationX = maxMd - minX
    // let translationY= maxMd - minY

    // positions = positions.map(p => [p[0] + translationX, p[1] + translationY, p[2] + translationX, p[3] + translationY, p[4]]) // translate position
    // let map = Array(maxY + translationY*2).fill('.').map(x => Array(maxX + translationX*2).fill('.')) // map[Y][X]

    // // Manhattan distance
    // function updateMap(i) {
    //     let [sensorX, sensorY, beaconX, beaconY, md] = positions[i]
    //     map[sensorY][sensorX] = 'S'
    //     map[beaconY][beaconX] = 'B'

    //     for (let y=0; y<md+1; y++) {
    //         for (let x=0; x<md+1-y; x++) {
    //             let drawPoints = [
    //                 [sensorY + y, sensorX + x], 
    //                 [sensorY + y, sensorX - x],
    //                 [sensorY - y, sensorX + x],
    //                 [sensorY - y, sensorX - x]]
    //             for (let p=0; p<drawPoints.length; p++) {
    //                 if (map[drawPoints[p][0]][drawPoints[p][1]] === '.') map[drawPoints[p][0]][drawPoints[p][1]] = '#'
    //             }
    //         }
    //     }
    // }

    // function drawMap() {
    //     for (let i=0; i<map.length; i++) console.log(i, map[i].join(""))
    // }

    // for (let i=0; i<positions.length; i++) updateMap(i)
    // drawMap()
    // function nbPositionWithNoBeacon(row){
    //     return map[row+translationY].filter(e => e === '#').map(i => 1).reduce((acc,cur) => acc+cur, 1) - 1
    // }   
    // console.log(nbPositionWithNoBeacon(10))


    function calculateForRow(row) {
        let devices = new Set()
        let coverage = new Set()
        lines.forEach(line => {
            let [sx, sy, bx, by] = line.match(regex).map(x => parseInt(x))
            let d = Math.abs(sx - bx) + Math.abs(sy - by) 
            if (sy === row) devices.add(sx)
            if (by === row) devices.add(bx)
            if (sy + d >= row && sy - d <= row) {
                let diff = Math.abs(row - sy)
                for (let i=0; i<d-diff+1; i++) {
                    coverage.add(sx+i)
                    coverage.add(sx-i)
                }
            }
        })
        
        // console.log(Math.min(...coverage), Math.max(...coverage), coverage.size)
        return coverage.size - devices.size
    }
    ans1 = calculateForRow(2000000)

    // Answers
    
    console.log("Part1 - In the row where y=2000000, how many positions cannot contain a beacon?", ans1)
    console.log("Part2 - What is its tuning frequency?", ans2)

} catch (err) {
    console.error(err)
}