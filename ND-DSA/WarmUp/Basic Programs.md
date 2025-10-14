
countNumberOfDigits(2323) = 4
countNumberOfDigits(-323) = 3
countNumberOfDigits(0) = 0
```
const countNumberOfDigits= (n) => {
    let count = 0;
    if (n === 0) return 1;
    n = Math.abs(n);
    while(n > 0) {
        count++;
        n = Math.floor(n/10)
        
    }
    return count;
}

console.log(countNumberOfDigits(-32));
```


