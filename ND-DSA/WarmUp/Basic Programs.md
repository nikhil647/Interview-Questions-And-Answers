
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

## Two Sum Problem:
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

 

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]

**2 versions**
### 1) Time Complexity O(n^2), space Complexity O(1)
```javascript
var twoSum = function(nums, target) {
    const n = nums.length;
    for(let i=0;i<n-1;i++) {
        for(let j=i+1;j<n;j++) {
            if(nums[i] + nums[j] === target) {
                return [i,j];
            }
        }
    }
};
```
### 2) Time Complexity O(n), space Complexity O(n)
```javascript
const twoSum = (nums, op) => {
    const map = new Map();
    for (let i=0; i<nums.length ; i++) {
        const complement = op - nums[i];
        if(map.has(complement)) {
            return [i, map.get(complement)]
        }
        map.set(nums[i], i);
    }
}
```
Why did you choose Map instead of Object?
→ Map preserves insertion order and works better for non-string keys.

### 3) Second Largest Digit in a String

Input: s = "dfa12321afd"
Output: 2
Explanation: The digits that appear in s are [1, 2, 3]. The second largest digit is 2.
Example 2:

Input: s = "abc1111"
Output: -1
Explanation: The digits that appear in s are [1]. There is no second largest digit. 

```javascript
var secondHighest = function(str) {
    let largest = -1, secondLargest = -1;
    for(ch of str) {
        if(ch > '0' && ch < '9') {
            let num = Number(ch);
            if(num > largest) {
                secondLargest = largest;
                largest = num;
            }
            else if(num < largest && num >= secondLargest) {
                secondLargest = num;
            }
        }
    }
    return secondLargest;
};
```

### Given an integer x, return true if x is a palindrome, and false otherwise.

Example 1:
Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.
Example 2:

Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
Example 3:

Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.

```javascript
/**
 * @param {number} x
 * @return {boolean}
 */
const isPalindrome = (string) => {
    if(string < 0) {
        return false;
    }
    const str = String(string);
    const rev = str.split('').reverse().join('');
    if(str === rev) {
        return true
    }
    return false
}

console.log(isPalindrome(-121));
```