const fs = require('fs');

try {
    const data = fs.readFileSync('day16.test.txt', 'UTF-8')
    const lines = data.split("\n")

    const regex = /[+-]?\b[0-9]+\b/g;
    const startPoint = 'AA'
    let valves = {} // { 'id': { 'rate': int, 'neighbours': [string], 'distances': { ['id']: int } }}

    /* EXTRACT DATA */

    lines.forEach(line => {
        let l = line.split(' ')
        valves[l[1]] = {}
        valves[l[1]]['rate'] = parseInt(l[4].match(regex)[0])
        valves[l[1]]['neighbours'] = l.slice(9).join(' ').split(', ')
    })
    
    /* ADD ALL SHORTEST DISTANCES */

    let valvesWithNoZeroRate = Object.keys(valves).filter(v => valves[v]['rate'] !== 0) // don't need valves with 0 rate
    let valvesWithNoZeroRateAndStartPoint  = [...valvesWithNoZeroRate, startPoint]

    function getShortDistance(source, target, valves) {
        let queue = [[source, 0]]
        let visited = new Set()
        
        while (queue.length > 0) {
            let [element,distance] = queue.shift()
            if (target === element) return distance

            if (visited.has(element)) continue
            else visited.add(element)
            valves[element]['neighbours'].forEach(n => queue.push([n, distance+1]))
        }
    }

    valvesWithNoZeroRateAndStartPoint.forEach(source => {
        valves[source]['distances'] = {}
        for (let i=0; i<valvesWithNoZeroRate.length; i++) {
            let target = valvesWithNoZeroRate[i]
            if (source !== target) {
                let d = getShortDistance(source, target, valves)
                valves[source]['distances'][target] = d
            }
        }
    })

    /* CONSOLE LOG */
    // console.log(valves)
    console.log(valvesWithNoZeroRate)


    /* CALCULATE BEST PRESSURE */

    // try info 
    // - first try:  brut force -> JavaScript heap out of memory
    // - second try: BFS with all possibility -> take too much time 
    // - third try:  embedded for (keep only best solution) with only the open valves -> ok

    function bestPressure(valve, time, openValves) {
        let currentBestValve = "END"
        let currentBestValves = []
        let currentBestPressure = 0

        for (let i=0; i<openValves.length; i++) {
            let nextValve = openValves[i] 
            let newOpenValves = [...openValves].filter(v => v !== valve)
            let newTime = time - valves[valve]['distances'][nextValve]
            if (newTime < 0 || valve === nextValve || nextValve == undefined) continue;

            // open valves
            newTime -= 1
            let rate = valves[nextValve]['rate']
            let pressure = newTime * rate
            
            if (newOpenValves.length < 1) continue
            // go next valve
            let [nextBestPressure, bestValves] = bestPressure(nextValve, newTime, newOpenValves)

            // total pressure
            let totalPressure = pressure + nextBestPressure

            // keep only the best amount openValves
            if (totalPressure > currentBestPressure) {
                currentBestPressure = totalPressure
                currentBestValve = valve
                currentBestValves = bestValves
            }
        }

        return [currentBestPressure, [currentBestValve, ...currentBestValves]]
    }
    
    /* PART 1 */

    let timer = 30
    let [ans1, bestPath] = bestPressure(startPoint, timer, valvesWithNoZeroRate)

    /* PART 2 */

    // info 
    // - old combination of 2 sets
    // - forEach combination -> bestPressure(A) + bestPressure(B)
    // - keep the best 

    // --> with all combination, we may have too many possibility. 
    // Tips: let's generate random combination and try many time. 

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    function generateRandomSubPath(array) {
        let ca = [...array]
        let h = []
        let elephant = []
        while (ca.length > 0) {
            if (getRndInteger(0,100) > 50) h.push(ca.pop())
            else elephant.push(ca.pop())
        }
        return [h, elephant]
    }
    
    let ans2 = 0
    let numberOfTest = 10000 
    let h_bestPath = []
    let elephant_bestPath = []
    timer = 26

    for (let i=0; i<numberOfTest; i++) {
        let [h, elephant] = generateRandomSubPath(valvesWithNoZeroRate)
        // console.log(h.join("::"), elephant.join("::"))
        let [pressure1, path1] = bestPressure(startPoint, timer, h) 
        let [pressure2, path2] = bestPressure(startPoint, timer, elephant) 
        let pressure = pressure1 + pressure2
        if (pressure > ans2) {
            ans2 = pressure
            h_bestPath = path1
            elephant_bestPath = path2
        }
    }

    // Answers
    
    console.log("Part1 - What is the most pressure you can release?", ans1, "with best path -->", bestPath.join('::'))
    console.log("Part2 - With you and an elephant working together for 26 minutes, what is the most pressure you could release?", ans2, "with h best path -->", h_bestPath.join('::'),  "with elephant best path -->", elephant_bestPath.join('::'))

} catch (err) {
    console.error(err)
}