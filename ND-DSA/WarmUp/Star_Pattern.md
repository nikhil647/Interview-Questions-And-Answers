n = 5
    *
   **
  ***
 ****
*****

```
const n = 5
for(let i = 0; i<n ; i++) {
    let row = '';
    for(let j = 0; j < n; j++) {
         if (j < n-1-i) {
            row+=' ';        
         }
         else {
            row+='*'       
         }
         
    }
    console.log(row);
}
```

/*
1
1 0
1 0 1
1 0 1 0 1
1 0 1 0 1 0
*/
```
const n = 5
for(let i = 0; i<n ; i++) {
    let row = '';
    for(let j = 0; j <= i; j++) {
        if(j%2 === 0) {
            row+='1'    
        }
        else {
            row+='0'
        }   
    }
    console.log(row)
}
```


/*
        1
      2 2
    3 3 3
  4 4 4 4
5 5 5 5 5
*/
```
const n = 5
for(let i = 0; i<n ; i++) {
    let row = '';
    for(let j = 0; j < n; j++) {
        if (j >= n-1-i) {
           row += i+1; 
        }
        else {
           row += ' '; 
        }
    }
    console.log(row)
}
```

/*
    *
   ***
  *****
 *******
*********
*/
```
let n = 5;
for (let i = 1; i <= n; i++) {
  let line = "";
  for (let j = 1; j <= n - i; j++) line += " "; // spaces
  for (let k = 1; k <= 2 * i - 1; k++) line += "*"; // stars
  console.log(line);
}
```