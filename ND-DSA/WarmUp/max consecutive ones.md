function findMaxConsecutiveOnes(nums) {
  let maxConsecutiveOnes = 0;
  let currentCount = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      currentCount++;
      if (currentCount > maxConsecutiveOnes) {
        maxConsecutiveOnes = currentCount;
      }
    } else {
      currentCount = 0;
    }
  }

  return maxConsecutiveOnes;
}

// Example:
console.log(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1])); // Output: 3
