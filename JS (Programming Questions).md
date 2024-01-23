REF: https://www.keka.com/javascript-coding-interview-questions-and-answers

# JS Coding Interview Preparation

## All Questions

## Implement a function that finds the maximum number in an array.

```
const array = [10,20,30,40,50];
let max = array[0];
for (let i = 0;i < array.length; i++) {
    max =  array[i] > max ? array[i] : max;
}
console.log(max)
```

## Write a function that returns a new array containing only the unique elements from an input array
With Set
```
const array = [10,20,30,40,10];
const uniqArray = [...new Set(array)];
```
Without using set
```
list = list.filter((x, i, a) => a.indexOf(x) == i)
```
Without using any built it function
```
// Sort the input array
// If the current element is not equal to the previous element, add it to uniqueArray
function uniqueArray(inputArray) {
    inputArray.sort((a, b) => a - b);
    let uniqueArray = [];
    let prevElement = null;
    for (let i = 0; i < inputArray.length; i++) {
        if (inputArray[i] !== prevElement) {
            uniqueArray.push(inputArray[i]);
            prevElement = inputArray[i];
        }
    }
    return uniqueArray;
}
let inputArray = [1, 2, 2, 2, 3, 4, 4, 5, 5];
let resultArray = uniqueArray(inputArray);
console.log(resultArray);
```

## Quick Sort
Logic - select first element as pivot arrange all small elements to the left and all large element at right (not necessarily in sorted manner)
Steps
1) We use recursion so base condition is array length is less than or equal to 1 return array.
2) keep first element as pivot and start loop from 1st(0th + 1) till end.
3) maintain two array left and right array. in for loop push all smaller elements in left array and large element in right array
4) Apply same logic on left and right array but write in this array.
  pivot element is already sorted.

```
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    } else {
        const pivot = arr[0];
        const left = [];
        const right = [];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < pivot) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        return [...quickSort(left), pivot, ...quickSort(right)];
    }
}

// Example usage
let inputArray = [4, 2, 7, 1, 9, 5];
let resultArray = quickSort(inputArray);
console.log(resultArray); // Output: [1, 2, 4, 5, 7, 9]
```
## Palindrome
Logic --> take mid and travel to mid and calculate length compare first element with last (length - i) if not matching - not a pandindrom
```
let string = 'raar';
const stringArray = string.split('');
console.log(stringArray)
const L = stringArray.length-1;
for (let i = 0;i < Math.floor(L/2) ; i++) {
    if(stringArray[i] !== stringArray[L-i]) {
        console.log("Not a Palindrom")
        break;
    }
}
```
With Js Inbuilt Methods.
```
const str = 'radar';
console.log(str.split('').reverse().join('') === str);
```
## Reverse the string (Recursion)
Normal array method
```
const string = 'AnyString'
const revString = string.split('').reverse().join('')
```
Recursion Method
```
function reverse(str){
    if(str.length === 0 || str.length === 1 ) {
        return str
    }
    
    const lastChar = str.slice(-1)
    const remainingStr = str.slice(0,-1)
    return lastChar + reverse(remainingStr)
}
const revStr = reverse(string) // gnirtSynA
```
***
## factorial of a given number.
With Recursion
```
const fact = (num) => num == 0 || num == 1 ? 1 : num * fact(num-1);
console.log(fact(5))
```
Without Recursion
```
let num = 5
let fact = 1
for (let i=num;i > 0;i--) {
    fact = i * fact
}
console.log(fact);
```
## Prime Number
```
function  isPrime(num)  { 
	for  (let i =  2; i * i <= num; i++)
		if  (num % i ===  0)
			return  false;
	return num >  1;
}
```
## Merge Sort
```
const mergeSort = arr =>
  arr.length <= 1
    ? arr
    : ((mid = Math.floor(arr.length / 2)),
      merge(
        mergeSort(arr.slice(0, mid)),
        mergeSort(arr.slice(mid))
      ));

const merge = (left, right) => {
  let result = [],
    leftIndex = 0,
    rightIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length)
    left[leftIndex] < right[rightIndex]
      ? result.push(left[leftIndex++])
      : result.push(right[rightIndex++]);
  return result.concat(left.slice(leftIndex), right.slice(rightIndex));
};

// Example usage
let inputArray = [4, 2, 7, 1, 9, 5];
let resultArray = mergeSort(inputArray);
console.log(resultArray); // Output: [1, 2, 4, 5, 7, 9]
```

## two string Anagram of each other

anagram.js 
```
With Built in methods
let p = 'india',q = 'diain';

p.split('').sort().join('') == q.split('').sort().join('') ? console.log('anagram') : console.log(' not anagram')
```

```
Without Built in methods
//Anagram of Each Other
let str1 = 'India',str2 = 'aidin';

function quickSort(str) {
    if (str.length <= 1) {
        return str;
    }
    const pivot = str[0];
    let left = '';
    let right = '';
    for (let i = 1; i < str.length; i++) {
        if (str[i] < pivot) {
            left += str[i];
        } else {
            right += str[i];
        }
    }
    return quickSort(left) + pivot + quickSort(right);
}


Object.defineProperty(String.prototype, "mySort", {
    value: function () {
        return quickSort(this.toString());
    },
});

str1 = str1.toLowerCase().mySort();
str2 = str2.toLowerCase().mySort();

if(str1 == str2) {
    console.log('Anagram of each other');
}
else {
    console.log('Not anagram of each other');
}
```

## Binary Search
//only works in sorted array TC --> O(log n)
Binary search works by repeatedly dividing the sorted array in half and narrowing down the search range until the target element is found
```
let arr = [0,  1,  4,  6, 12, 23, 45, 66];
searchElement = 45;
const s = binary_search(arr,searchElement,0,arr.length-1);
console.log(s);

function binary_search(arr,searchElement,startPos,endPos) {
    if(startPos>endPos) return -1;
    let mid = Math.floor((startPos+endPos)/2);
    if(arr[mid] == searchElement) {
        return mid;
    }
    if(arr[mid] > searchElement) {
        return binary_search(arr,searchElement,startPos,mid-1);
    }
    else {
      return binary_search(arr,searchElement,mid+1,endPos);
    }
}
```
## what is output ?
```
for (var i = 1;i<= 5;i++) {
    setTimeout(function() {
        console.log(i);
    }, 100);
}
Output --> 6, 6, 6, 6, 6
```
```
for (let i = 1;i<= 5;i++) {
    setTimeout(function() {
        console.log(i);
    }, 100);
}
Output --> 1, 2, 3, 4, 5
```
***
Local & Global Scope Question

# Count Vowel
```
function countVowel(str) {
    const length = str.match(/[aioue]/gi).length;
    return length;
}

const string = prompt('Enter a string: ');
const result = countVowel(string);
console.log('result -->', result);
```

# Find Duplicate Elements 
```
function findDuplicateEle(arr) {
    let obj = {};
    arr.forEach(ele => {
            obj[ele] = ele;    
    });
    for(const ele in obj) {
        console.log(ele);
    }
}

findDuplicateEle([1,2,3,5,3,1,9, 1]);
```

# given charactor set genrate Randome String.
```
function returnRandomeString(charaterSet, expectedlength) {
    let randomString = '';
    while(randomString.length < expectedlength) {
        const randomeNumber = Math.floor(Math.random() * charaterSet.length);
        randomString+= charaterSet[randomeNumber]
    }
    return randomString;
}

const charaterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const expectedlength = 8;

console.log(returnRandomeString(charaterSet,expectedlength));
```

#Link List

class ListNode {
    constructor(data) {
        this.data = data
        this.next = null                
    }
}
class LinkedList {
    constructor(head = null) {
        this.head = head;
        this.size = 1;
    }
    size() {
        let count = 0; 
        let node = this.head;
        while (node) {
            count++;
            node = node.next
        }
        return count;
    }
    getLast() {
        let lastNode = this.head;
        if (lastNode) {
            while (lastNode.next) {
                lastNode = lastNode.next
            }
        }
        return lastNode
    }
    getFirst() {
        return this.head;
    }
    insertAtBeg(data) {
        const newNode = new ListNode(data);
        newNode.next= this.head;
        this.head = newNode;
        this.size++;
    }
    insertAtEnd(data) {
        let node = this.head;
        while(node.next !== null) {
            node = node.next;
        }
        node.next = new ListNode(data);
        this.size++;
    }
    printLL() {
        let node = this.head;
        while(node !== null) {
            console.log('Data -->',node.data);
            node = node.next;
        }
    }
    printMiddle() {
        let node = this.head;
        const middle = Math.ceil(this.size / 2);
        let index = 1;
        while(middle !== index) {
            node = node.next;
            index++;
        }
        return node.data;
    }
    reverseLinkList() {
        let current = this.node;
        let prev = null;
        let next;
        while(current != null) {
           next = current.next;
           current.next = prev;
           prev = current;
           current= next
        }
    }
}
let node1 = new ListNode(2);
let list = new LinkedList(node1);
list.insertAtBeg(1);
list.insertAtEnd(3)
list.insertAtEnd(4)
list.insertAtEnd(5)
list.printLL();

list.reverseLinkList();

list.printLL();


// let list = new LinkedList(node1);
// console.log(list.size())
// console.log(list.getLast());
// console.log(list.getFirst().data);
// console.log(list.head.next.data);
console.log(list.printMiddle())

## React: Create Stopwatch (sandbox)
```
https://codesandbox.io/s/elastic-hoover-dq6dxx?file=/src/App.js
```
