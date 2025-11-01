```javascript
/**
 * @param {number[][]} grid
 * @return {number}
 */
var countNegatives = function(grid) {
    let count = 0;
    for(let i = 0;i<grid.length;i++) {
        const internalArray = grid[i];
        for(let j = 0; j < internalArray.length; j++ ) {
            if(internalArray[j] < 0) {
                count++;
            }
        }
    }
    return count;
};
```