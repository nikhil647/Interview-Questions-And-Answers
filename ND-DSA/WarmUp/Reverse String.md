//Reverse Integer 'camel' --> 'lemac'
```javascript
const str = 'camel';

// with using inbuilt function.
const reverse = str.split('').reverse().join('');
console.log('reverse',reverse);

// without using inbuilt function.
let newStr = ''
for(let j=str.length-1;j>=0;j--) {
    newStr+=str[j];
}
console.log(newStr)
```
