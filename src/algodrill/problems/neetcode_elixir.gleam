//// Reveal-only: Elixir drills carry a prompt, the approach write-up and the
//// solutions, but no Check — see the comment on `problem.Check` for why there
//// is no in-browser Elixir grader. The `check: None` branches in view/drill
//// already handle a drill with nothing to run.

import algodrill/problem.{
  type Category, type Problem, Category, Elixir, Problem, Solution, Subcategory,
}
import algodrill/problems/approaches
import algodrill/problems/embedded_elixir
import gleam/list
import gleam/option.{None}

pub fn category() -> Category {
  Category("NeetCode 150 (Elixir)", [
    Subcategory("Arrays & Hashing", [
      drill(
        "Contains Duplicate",
        "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
        embedded_elixir.nc01_contains_duplicate(),
      ),
      drill(
        "Valid Anagram",
        "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
        embedded_elixir.nc02_valid_anagram(),
      ),
      drill(
        "Two Sum",
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        embedded_elixir.nc03_two_sum(),
      ),
      drill(
        "Group Anagrams",
        "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
        embedded_elixir.nc04_group_anagrams(),
      ),
      drill(
        "Top K Frequent Elements",
        "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",
        embedded_elixir.nc05_top_k_frequent(),
      ),
      drill(
        "Product of Array Except Self",
        "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. Solve without division and in O(n) time.",
        embedded_elixir.nc06_product_except_self(),
      ),
      drill(
        "Longest Consecutive Sequence",
        "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.",
        embedded_elixir.nc07_longest_consecutive(),
      ),
    ]),
    Subcategory("Two Pointers", [
      drill(
        "Valid Palindrome",
        "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
        embedded_elixir.nc08_valid_palindrome(),
      ),
      drill(
        "Two Sum II - Input Array Is Sorted",
        "Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the two indices, 1-indexed.",
        embedded_elixir.nc09_two_sum_sorted(),
      ),
      drill(
        "3Sum",
        "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i, j, and k are distinct and the sum is 0. The solution set must not contain duplicate triplets.",
        embedded_elixir.nc10_three_sum(),
      ),
      drill(
        "Container With Most Water",
        "You are given an integer array height of length n. Find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water a container can store.",
        embedded_elixir.nc11_container_water(),
      ),
    ]),
    Subcategory("Sliding Window", [
      drill(
        "Best Time to Buy and Sell Stock",
        "You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize your profit by choosing a single day to buy and a different day in the future to sell.",
        embedded_elixir.nc12_best_time_stock(),
      ),
      drill(
        "Longest Substring Without Repeating Characters",
        "Given a string s, find the length of the longest substring without repeating characters.",
        embedded_elixir.nc13_longest_substring(),
      ),
      drill(
        "Longest Repeating Character Replacement",
        "You are given a string s and an integer k. You can change any character to any other uppercase English character at most k times. Return the length of the longest substring containing the same letter you can get.",
        embedded_elixir.nc14_character_replacement(),
      ),
      drill(
        "Permutation in String",
        "Given two strings s1 and s2, return true if s2 contains a permutation of s1. In other words, return true if one of s1's permutations is a substring of s2.",
        embedded_elixir.nc15_permutation_in_string(),
      ),
    ]),
    Subcategory("Stack", [
      drill(
        "Valid Parentheses",
        "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        embedded_elixir.nc16_valid_parentheses(),
      ),
      drill(
        "Min Stack",
        "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
        embedded_elixir.nc17_min_stack(),
      ),
      drill(
        "Daily Temperatures",
        "Given an array of integers temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.",
        embedded_elixir.nc18_daily_temperatures(),
      ),
    ]),
    Subcategory("Binary Search", [
      drill(
        "Binary Search",
        "Given a sorted array of integers nums and an integer target, write a function to search target in nums. Return its index, or -1 if it does not exist. Must run in O(log n) time.",
        embedded_elixir.nc19_binary_search(),
      ),
      drill(
        "Find Minimum in Rotated Sorted Array",
        "Suppose an array of length n sorted in ascending order is rotated. Given the rotated array of unique elements, return the minimum element. Must run in O(log n) time.",
        embedded_elixir.nc20_find_min_rotated(),
      ),
      drill(
        "Search in Rotated Sorted Array",
        "Given a rotated sorted array of distinct integers nums and an integer target, return the index of target, or -1 if it is not present. Must run in O(log n) time.",
        embedded_elixir.nc21_search_rotated(),
      ),
    ]),
  ])
}

fn drill(
  title: String,
  prompt: String,
  solutions: List(#(String, String)),
) -> Problem {
  Problem(
    title: title,
    prompt: prompt,
    approach: approaches.for_title(title),
    solutions: list.map(solutions, fn(s) { Solution(label: s.0, code: s.1) }),
    language: Elixir,
    check: None,
    quiz: None,
  )
}
