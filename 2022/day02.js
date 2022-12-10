// A = Rock = 1 = X
// B = Paper = 2 = Y
// C = CScissors = 3 = Z
// lost = 0, draw = 3, win = 6 
const fs = require('fs');

try {
    const data = fs.readFileSync('day02.txt', 'UTF-8')
    const lines = data.split(/\r?\n/)
  
    // PART 1
    // example of expr: B X
    function strategy1(expr) {
        switch (expr) {
            case 'A X':
            case 'B Y':
            case 'C Z': 
                return 3
            case 'A Z':
            case 'B X':
            case 'C Y': 
                return 0
            case 'A Y':
            case 'B Z':
            case 'C X': 
                return 6
        }
    } 

    function shapePoint(expr) {
        switch (expr.slice(-1)) {
            case 'X': return 1
            case 'Y': return 2
            case 'Z': return 3
        }
    }

    // PART 2
    function strategy2(expr) {
        switch (expr.slice(-1)) {
            case 'X': return 0
            case 'Y': return 3
            case 'Z': return 6
        }
    }

    function shapePoint2(expr) {
        const a = expr[0]
        const b = expr.slice(-1)
        switch (b) {
            // lose
            case 'X': 
                switch (a) {
                    case 'A': return 3
                    case 'B': return 1
                    case 'C': return 2
                }
            // draw
            case 'Y': 
            switch (a) {
                case 'A': return 1
                case 'B': return 2
                case 'C': return 3
            }
            // win
            case 'Z': 
                switch (a) {
                    case 'A': return 2
                    case 'B': return 3
                    case 'C': return 1
                }
        }
    }

    // RUN

    var scoreA = 0
    var scoreB = 0

    lines.forEach(line => {
      if (line !== "") {
        scoreA += strategy1(line)
        scoreA += shapePoint(line)

        scoreB += strategy2(line)
        scoreB += shapePoint2(line)
      } 
    })

    console.log("total score with strategy 1 is: " + (scoreA))
    console.log("total score with strategy 2 is: " + (scoreB))

  } catch (err) {
    console.error(err)
  }