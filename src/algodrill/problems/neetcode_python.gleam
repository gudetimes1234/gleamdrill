import algodrill/problem.{
  type Category, Category, Problem, Python, Solution, Subcategory,
}
import algodrill/problems/approaches
import gleam/option.{None}

pub fn category() -> Category {
  Category("NeetCode 150", [
    Subcategory("Arrays & Hashing", [
      Problem(
        title: "Contains Duplicate",
        prompt: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
        approach: approaches.for_title("Contains Duplicate"),
        solutions: [
          Solution(
            label: "Solution 1",
            code: "def containsDuplicate(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False",
          ),
        ],
        language: Python,
        check: None,
      ),
      Problem(
        title: "Valid Anagram",
        prompt: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
        approach: approaches.for_title("Valid Anagram"),
        solutions: [
          Solution(
            label: "Solution 1",
            code: "def isAnagram(s, t):
    if len(s) != len(t):
        return False

    count = {}
    for char in s:
        count[char] = count.get(char, 0) + 1

    for char in t:
        if char not in count:
            return False
        count[char] -= 1
        if count[char] < 0:
            return False

    return True",
          ),
        ],
        language: Python,
        check: None,
      ),
      Problem(
        title: "Two Sum",
        prompt: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        approach: approaches.for_title("Two Sum"),
        solutions: [
          Solution(
            label: "Solution 1",
            code: "def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []",
          ),
        ],
        language: Python,
        check: None,
      ),
      Problem(
        title: "Group Anagrams",
        prompt: "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
        approach: approaches.for_title("Group Anagrams"),
        solutions: [
          Solution(
            label: "Solution 1",
            code: "from collections import defaultdict

def groupAnagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        key = [0] * 26
        for c in s:
            key[ord(c) - ord('a')] += 1
        groups[tuple(key)].append(s)
    return list(groups.values())",
          ),
        ],
        language: Python,
        check: None,
      ),
      Problem(
        title: "Top K Frequent Elements",
        prompt: "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",
        approach: approaches.for_title("Top K Frequent Elements"),
        solutions: [
          Solution(
            label: "Solution 1",
            code: "from collections import Counter

def topKFrequent(nums, k):
    counts = Counter(nums)
    buckets = [[] for _ in range(len(nums) + 1)]
    for num, freq in counts.items():
        buckets[freq].append(num)

    result = []
    for freq in range(len(buckets) - 1, 0, -1):
        for num in buckets[freq]:
            result.append(num)
            if len(result) == k:
                return result
    return result",
          ),
        ],
        language: Python,
        check: None,
      ),
      Problem(
        title: "Product of Array Except Self",
        prompt: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. Solve without division and in O(n) time.",
        approach: approaches.for_title("Product of Array Except Self"),
        solutions: [
          Solution(
            label: "Solution 1",
            code: "def productExceptSelf(nums):
    n = len(nums)
    result = [1] * n

    prefix = 1
    for i in range(n):
        result[i] = prefix
        prefix *= nums[i]

    suffix = 1
    for i in range(n - 1, -1, -1):
        result[i] *= suffix
        suffix *= nums[i]

    return result",
          ),
        ],
        language: Python,
        check: None,
      ),
      Problem(
        title: "Longest Consecutive Sequence",
        prompt: "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.",
        approach: approaches.for_title("Longest Consecutive Sequence"),
        solutions: [
          Solution(
            label: "Solution 1",
            code: "def longestConsecutive(nums):
    num_set = set(nums)
    longest = 0

    for num in num_set:
        # only start counting from the beginning of a run
        if num - 1 not in num_set:
            length = 1
            while num + length in num_set:
                length += 1
            longest = max(longest, length)

    return longest",
          ),
        ],
        language: Python,
        check: None,
      ),
    ]),
    Subcategory("Two Pointers", [
      Problem(
        title: "Valid Palindrome",
        prompt: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
        approach: approaches.for_title("Valid Palindrome"),
        solutions: [
          Solution(
            label: "Solution 1",
            code: "def isPalindrome(s):
    left, right = 0, len(s) - 1

    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1

        if s[left].lower() != s[right].lower():
            return False

        left += 1
        right -= 1

    return True",
          ),
        ],
        language: Python,
        check: None,
      ),
      Problem(
        title: "Two Sum II - Input Array Is Sorted",
        prompt: "Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the two indices, 1-indexed.",
        approach: approaches.for_title("Two Sum II - Input Array Is Sorted"),
        solutions: [
          Solution(
            label: "Solution 1",
            code: "def twoSum(numbers, target):
    left, right = 0, len(numbers) - 1

    while left < right:
        total = numbers[left] + numbers[right]
        if total == target:
            return [left + 1, right + 1]
        elif total < target:
            left += 1
        else:
            right -= 1

    return []",
          ),
        ],
        language: Python,
        check: None,
      ),
      Problem(
        title: "3Sum",
        prompt: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i, j, and k are distinct and the sum is 0. The solution set must not contain duplicate triplets.",
        approach: approaches.for_title("3Sum"),
        solutions: [
          Solution(
            label: "Solution 1",
            code: "def threeSum(nums):
    nums.sort()
    result = []

    for i, a in enumerate(nums):
        if i > 0 and a == nums[i - 1]:
            continue

        left, right = i + 1, len(nums) - 1
        while left < right:
            total = a + nums[left] + nums[right]
            if total < 0:
                left += 1
            elif total > 0:
                right -= 1
            else:
                result.append([a, nums[left], nums[right]])
                left += 1
                while left < right and nums[left] == nums[left - 1]:
                    left += 1

    return result",
          ),
        ],
        language: Python,
        check: None,
      ),
      Problem(
        title: "Container With Most Water",
        prompt: "You are given an integer array height of length n. Find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water a container can store.",
        approach: approaches.for_title("Container With Most Water"),
        solutions: [
          Solution(
            label: "Solution 1",
            code: "def maxArea(height):
    left, right = 0, len(height) - 1
    best = 0

    while left < right:
        area = (right - left) * min(height[left], height[right])
        best = max(best, area)

        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return best",
          ),
        ],
        language: Python,
        check: None,
      ),
    ]),
    Subcategory("Sliding Window", [
      Problem(
        title: "Best Time to Buy and Sell Stock",
        prompt: "You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize your profit by choosing a single day to buy and a different day in the future to sell.",
        approach: approaches.for_title("Best Time to Buy and Sell Stock"),
        solutions: [
          Solution(
            label: "Solution 1",
            code: "def maxProfit(prices):
    lowest = float('inf')
    profit = 0

    for price in prices:
        lowest = min(lowest, price)
        profit = max(profit, price - lowest)

    return profit",
          ),
        ],
        language: Python,
        check: None,
      ),
      Problem(
        title: "Longest Substring Without Repeating Characters",
        prompt: "Given a string s, find the length of the longest substring without repeating characters.",
        approach: approaches.for_title(
          "Longest Substring Without Repeating Characters",
        ),
        solutions: [
          Solution(
            label: "Solution 1",
            code: "def lengthOfLongestSubstring(s):
    window = set()
    left = 0
    longest = 0

    for right in range(len(s)):
        while s[right] in window:
            window.remove(s[left])
            left += 1
        window.add(s[right])
        longest = max(longest, right - left + 1)

    return longest",
          ),
        ],
        language: Python,
        check: None,
      ),
      Problem(
        title: "Longest Repeating Character Replacement",
        prompt: "You are given a string s and an integer k. You can change any character to any other uppercase English character at most k times. Return the length of the longest substring containing the same letter you can get.",
        approach: approaches.for_title(
          "Longest Repeating Character Replacement",
        ),
        solutions: [
          Solution(
            label: "Solution 1",
            code: "def characterReplacement(s, k):
    count = {}
    left = 0
    max_count = 0
    longest = 0

    for right in range(len(s)):
        count[s[right]] = count.get(s[right], 0) + 1
        max_count = max(max_count, count[s[right]])

        while (right - left + 1) - max_count > k:
            count[s[left]] -= 1
            left += 1

        longest = max(longest, right - left + 1)

    return longest",
          ),
        ],
        language: Python,
        check: None,
      ),
      Problem(
        title: "Permutation in String",
        prompt: "Given two strings s1 and s2, return true if s2 contains a permutation of s1. In other words, return true if one of s1's permutations is a substring of s2.",
        approach: approaches.for_title("Permutation in String"),
        solutions: [
          Solution(
            label: "Solution 1",
            code: "from collections import Counter

def checkInclusion(s1, s2):
    if len(s1) > len(s2):
        return False

    need = Counter(s1)
    window = Counter(s2[:len(s1)])

    if window == need:
        return True

    for i in range(len(s1), len(s2)):
        window[s2[i]] += 1
        left_char = s2[i - len(s1)]
        window[left_char] -= 1
        if window[left_char] == 0:
            del window[left_char]
        if window == need:
            return True

    return False",
          ),
        ],
        language: Python,
        check: None,
      ),
    ]),
    Subcategory("Stack", [
      Problem(
        title: "Valid Parentheses",
        prompt: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        approach: approaches.for_title("Valid Parentheses"),
        solutions: [
          Solution(
            label: "Solution 1",
            code: "def isValid(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []

    for char in s:
        if char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False
        else:
            stack.append(char)

    return not stack",
          ),
        ],
        language: Python,
        check: None,
      ),
      Problem(
        title: "Min Stack",
        prompt: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
        approach: approaches.for_title("Min Stack"),
        solutions: [
          Solution(
            label: "Solution 1",
            code: "class MinStack:
    def __init__(self):
        self.stack = []
        self.mins = []

    def push(self, val):
        self.stack.append(val)
        current_min = val if not self.mins else min(val, self.mins[-1])
        self.mins.append(current_min)

    def pop(self):
        self.stack.pop()
        self.mins.pop()

    def top(self):
        return self.stack[-1]

    def getMin(self):
        return self.mins[-1]",
          ),
        ],
        language: Python,
        check: None,
      ),
      Problem(
        title: "Daily Temperatures",
        prompt: "Given an array of integers temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.",
        approach: approaches.for_title("Daily Temperatures"),
        solutions: [
          Solution(
            label: "Solution 1",
            code: "def dailyTemperatures(temperatures):
    result = [0] * len(temperatures)
    stack = []  # (index, temp) — monotonically decreasing

    for i, temp in enumerate(temperatures):
        while stack and temp > stack[-1][1]:
            prev_index, _ = stack.pop()
            result[prev_index] = i - prev_index
        stack.append((i, temp))

    return result",
          ),
        ],
        language: Python,
        check: None,
      ),
    ]),
    Subcategory("Binary Search", [
      Problem(
        title: "Binary Search",
        prompt: "Given a sorted array of integers nums and an integer target, write a function to search target in nums. Return its index, or -1 if it does not exist. Must run in O(log n) time.",
        approach: approaches.for_title("Binary Search"),
        solutions: [
          Solution(
            label: "Solution 1",
            code: "def search(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1",
          ),
        ],
        language: Python,
        check: None,
      ),
      Problem(
        title: "Find Minimum in Rotated Sorted Array",
        prompt: "Suppose an array of length n sorted in ascending order is rotated. Given the rotated array of unique elements, return the minimum element. Must run in O(log n) time.",
        approach: approaches.for_title("Find Minimum in Rotated Sorted Array"),
        solutions: [
          Solution(
            label: "Solution 1",
            code: "def findMin(nums):
    left, right = 0, len(nums) - 1

    while left < right:
        mid = left + (right - left) // 2
        if nums[mid] > nums[right]:
            left = mid + 1
        else:
            right = mid

    return nums[left]",
          ),
        ],
        language: Python,
        check: None,
      ),
      Problem(
        title: "Search in Rotated Sorted Array",
        prompt: "Given a rotated sorted array of distinct integers nums and an integer target, return the index of target, or -1 if it is not present. Must run in O(log n) time.",
        approach: approaches.for_title("Search in Rotated Sorted Array"),
        solutions: [
          Solution(
            label: "Solution 1",
            code: "def search(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid

        if nums[left] <= nums[mid]:  # left half sorted
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:  # right half sorted
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1

    return -1",
          ),
        ],
        language: Python,
        check: None,
      ),
    ]),
  ])
}
