
// TC - O(n),  SC - O(1)
// [1, 3, 12, 0, 0]

// Input: [1, 0, 2, 0, 3, 0, 4]
// Output: [1, 2, 3, 4, 0, 0, 0]

const array = [0, 1, 0, 3, 12];

let insetPos = 0;
const n = array.length - 1;
for (let i = 0; i <= n; i++) {
    if(array[i] !== 0) {
        array[insetPos] = array[i];
        insetPos++;
    }
}

for(let i = insetPos; i <= n; i++) {
    array[i]= 0;
}

console.log(array);

