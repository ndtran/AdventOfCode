const fs = require('fs');

try {
    const data = fs.readFileSync('day11.txt', 'UTF-8')
    const lines = data.split("\n")

    let regex = /\d+/g;
    let monkeys = []
    let monkey = {}
    let ans1 = 0
    let ans2 = 0

    lines.forEach(line => {
        let match = line.match(regex)
        if (line.includes('Monkey')) monkey['id'] = parseInt(match[0])
        else if (line.includes('Starting items')) monkey['items'] = match.map($0 => parseInt($0))
        else if (line.includes('Operation')) {
            monkey['operationNumber'] = match != null ? parseInt(match[0]) : undefined
            monkey['operation'] = line[" Operation: new = old ".length + 1]
        } 
        else if (line.includes('Test')) monkey['divisibleBy'] = parseInt(match[0])
        else if (line.includes('If true')) monkey['true'] = parseInt(match[0])
        else if (line.includes('If false')) monkey['false'] = parseInt(match[0])
        else {
            monkeys.push(monkey)
            monkey = {}
        }
    })
    monkeys.push(monkey) // push the last one

    // PART 1
    let monkeys_part1 = JSON.parse(JSON.stringify(monkeys))
    for (let i=0; i<20; i++) {
        monkeys_part1.forEach(monkey => {
            if (monkey['inspected'] === undefined) monkey['inspected'] = 0
            monkey['inspected'] += monkey['items'].length
            
            while (true) {
                let item = monkey['items'].reverse().pop()
                if (item === undefined) break

                let n =  monkey['operationNumber'] != undefined ? monkey['operationNumber'] : item
                if (monkey['operation'] === '*') item *= n
                else if (monkey['operation'] === '+') item += n
                else if (monkey['operation'] === '-') item -= n
                else if (monkey['operation'] === '/') item /= n
                
                let level = Math.floor(item / 3)
                if (level % monkey['divisibleBy'] == 0) monkeys_part1[monkey['true']]['items'].push(level)
                else monkeys_part1[monkey['false']]['items'].push(level)
            } 
        })
    }
    ans1 = monkeys_part1.map($0 => $0['inspected']).sort((a,b) => b-a).splice(0,2).reduce( (acc,cur) => acc*cur, 1)

    // PART 2
    // info: in part 2, the level is not divide by 3 and also the number is too big. the tick is to use the rest of lcm
    let lcm = monkeys.map($0 => $0['divisibleBy']).reduce((acc, cur) => acc*cur, 1)
    let monkeys_part2 = JSON.parse(JSON.stringify(monkeys))
    for (let i=0; i<10000; i++) {
        monkeys_part2.forEach(monkey => {
            if (monkey['inspected'] === undefined) monkey['inspected'] = 0
            monkey['inspected'] += monkey['items'].length
            
            while (true) {
                let item = monkey['items'].reverse().pop()
                if (item === undefined) break

                let n =  monkey['operationNumber'] != undefined ? monkey['operationNumber'] : item
                if (monkey['operation'] === '*') item *= n
                else if (monkey['operation'] === '+') item += n
                else if (monkey['operation'] === '-') item -= n
                else if (monkey['operation'] === '/') item /= n
                
                let level = item % lcm
                if (level % monkey['divisibleBy'] == 0) monkeys_part2[monkey['true']]['items'].push(level)
                else monkeys_part2[monkey['false']]['items'].push(level)
            } 
        })
    }
    ans2 = monkeys_part2.map($0 => $0['inspected']).sort((a,b) => b-a).splice(0,2).reduce( (acc,cur) => acc*cur, 1)

    // Answers
    console.log("Part1 - What is the level of monkey business after 20 rounds of stuff-slinging simian shenanigans?", ans1)
    console.log("Part2 - what is the level of monkey business after 10000 rounds?", ans2)

    } catch (err) {
        console.error(err)
    }