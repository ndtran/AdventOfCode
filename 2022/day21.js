const fs = require('fs');

try {
    const data = fs.readFileSync('day21.txt', 'UTF-8')
    const lines = data.split("\n")
    let regex = /[+-]?\b[0-9]+\b/g;

    let monkeys = {} // { [name]: { m1: string, m2: string, op: '*|+|/|-', number: int }}
    lines.forEach((line) => { 
        let [name, data] = line.split(": ")
        monkeys[name] = {}
        if (data.match(regex) != null) monkeys[name]['number'] = parseInt(data.match(regex)[0])
        else {
            let [m1, op, m2] = data.split(" ")
            monkeys[name]['m1'] = m1
            monkeys[name]['m2'] = m2
            monkeys[name]['op'] = op
        }
    })

    function numberOf(name) {
        let n = monkeys[name].number 
        if (n != null) return n 

        let n1 = numberOf(monkeys[name].m1)
        let n2 = numberOf(monkeys[name].m2)
        let result

        switch (monkeys[name].op) {
            case '*': result = n1 * n2; break
            case '+': result = n1 + n2; break
            case '/': result = n1 / n2; break
            case '-': result = n1 - n2; break
            default: break
        }
        // monkeys[name]['number'] = result
        return result
    }

    // PART 1
    
    let ans1 = numberOf('root')

    // PART 2

    let ans2 = 0
    let c = 10000000000000
    
    let m1 = monkeys['root'].m1
    let m2 = monkeys['root'].m2

    // find the direction
    monkeys['humn'].number = 0
    let n0 = numberOf('root')
    monkeys['humn'].number = 1
    let n1 = numberOf('root')
    let parity = n0 > n1 ? -1 : 1

    while (true) {
        monkeys['humn'].number = ans2
        let diff = numberOf(m1) - numberOf(m2)
        console.log(ans2, diff, c)

        if (diff === 0) break
        else if (diff > 0) ans2 -= (c * parity)
        else ans2 += (c * parity)
        c = c > 2 ? Math.floor(c/2) : 1
     }

    // Answers
    
    console.log("Part1 - What number will the monkey named root yell?", ans1)
    console.log("Part2 - What number do you yell to pass root's equality test?", ans2)

} catch (err) {
    console.error(err)
}