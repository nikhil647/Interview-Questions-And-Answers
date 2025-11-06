// Input: [3, 0, 1]
// find missing sum.

const array = [25, 27, 28, 29];
let min = Infinity;
let max = -Infinity;
let actualSum = 0;

for (number of array) {
    min = min < number ? min : number;
    max = max > number ? max : number;
    actualSum+=number;
}

let expectedSum = 0;
for (let i = min; i <= max; i++ ) {
    expectedSum+=i;
}

console.log('missing number ', expectedSum-actualSum)

