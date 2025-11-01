/**
 * @param {number} x
 * @return {number}
 */
 ```javascript
var reverse = function(x) {
    let isNeg = x < 0;
    let number = isNeg ? Math.abs(x) : x;

let reminder = '';
while(number > 1) {
    reminder += Math.floor(number % 10);
    number = number / 10;
}
    return isNeg ? -Number(reminder) : Number(reminder)
};
```