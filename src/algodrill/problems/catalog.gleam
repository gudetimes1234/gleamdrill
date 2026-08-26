//// The one ordered listing of the NeetCode 150 drills: subcategory order,
//// title, prompt, and the file stem the drill sources live under. Every
//// language builds its category from this, so a problem's title and prompt are
//// written once rather than once per language.
////
//// Adding a problem is one entry here plus its files under drills/. A language
//// with no source for a stem is skipped, which is what lets a category land in
//// one language before the others catch up.

import algodrill/problem.{
  type Category, type Check, type Language, type Problem, Category, Problem,
  Solution, Subcategory,
}
import algodrill/problems/approaches
import gleam/list
import gleam/option.{type Option, None}
import gleam/result

pub type Drill {
  Drill(title: String, prompt: String, stem: String)
}

pub type Group {
  Group(subcategory: String, drills: List(Drill))
}

pub const name = "NeetCode 150"

pub fn groups() -> List(Group) {
  [
    Group("Arrays & Hashing", [
      Drill(
        "Contains Duplicate",
        "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
        "nc01_contains_duplicate",
      ),
      Drill(
        "Valid Anagram",
        "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
        "nc02_valid_anagram",
      ),
      Drill(
        "Two Sum",
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        "nc03_two_sum",
      ),
      Drill(
        "Group Anagrams",
        "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
        "nc04_group_anagrams",
      ),
      Drill(
        "Top K Frequent Elements",
        "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",
        "nc05_top_k_frequent",
      ),
      Drill(
        "Encode and Decode Strings",
        "Design an algorithm to encode a list of strings to a single string, and another to decode that string back to the original list. The strings may contain any characters.",
        "nc22_encode_decode",
      ),
      Drill(
        "Product of Array Except Self",
        "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. Solve without division and in O(n) time.",
        "nc06_product_except_self",
      ),
      Drill(
        "Valid Sudoku",
        "Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated: each row, each column and each of the nine 3 x 3 sub-boxes must contain the digits 1-9 without repetition. Empty cells are written \".\".",
        "nc23_valid_sudoku",
      ),
      Drill(
        "Longest Consecutive Sequence",
        "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.",
        "nc07_longest_consecutive",
      ),
    ]),
    Group("Two Pointers", [
      Drill(
        "Valid Palindrome",
        "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
        "nc08_valid_palindrome",
      ),
      Drill(
        "Two Sum II - Input Array Is Sorted",
        "Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the two indices, 1-indexed.",
        "nc09_two_sum_sorted",
      ),
      Drill(
        "3Sum",
        "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i, j, and k are distinct and the sum is 0. The solution set must not contain duplicate triplets.",
        "nc10_three_sum",
      ),
      Drill(
        "Container With Most Water",
        "You are given an integer array height of length n. Find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water a container can store.",
        "nc11_container_water",
      ),
      Drill(
        "Trapping Rain Water",
        "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
        "nc24_trapping_rain_water",
      ),
    ]),
    Group("Sliding Window", [
      Drill(
        "Best Time to Buy and Sell Stock",
        "You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize your profit by choosing a single day to buy and a different day in the future to sell.",
        "nc12_best_time_stock",
      ),
      Drill(
        "Longest Substring Without Repeating Characters",
        "Given a string s, find the length of the longest substring without repeating characters.",
        "nc13_longest_substring",
      ),
      Drill(
        "Longest Repeating Character Replacement",
        "You are given a string s and an integer k. You can change any character to any other uppercase English character at most k times. Return the length of the longest substring containing the same letter you can get.",
        "nc14_character_replacement",
      ),
      Drill(
        "Permutation in String",
        "Given two strings s1 and s2, return true if s2 contains a permutation of s1. In other words, return true if one of s1's permutations is a substring of s2.",
        "nc15_permutation_in_string",
      ),
      Drill(
        "Minimum Window Substring",
        "Given two strings s and t, return the minimum window substring of s that contains every character of t, including duplicates. If there is no such substring, return the empty string.",
        "nc25_min_window_substring",
      ),
      Drill(
        "Sliding Window Maximum",
        "You are given an array of integers nums and a window of size k sliding from the very left to the very right, one position at a time. Return the maximum in the window at each position.",
        "nc26_sliding_window_maximum",
      ),
    ]),
    Group("Stack", [
      Drill(
        "Valid Parentheses",
        "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        "nc16_valid_parentheses",
      ),
      Drill(
        "Min Stack",
        "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
        "nc17_min_stack",
      ),
      Drill(
        "Daily Temperatures",
        "Given an array of integers temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.",
        "nc18_daily_temperatures",
      ),
    ]),
    Group("Binary Search", [
      Drill(
        "Binary Search",
        "Given a sorted array of integers nums and an integer target, write a function to search target in nums. Return its index, or -1 if it does not exist. Must run in O(log n) time.",
        "nc19_binary_search",
      ),
      Drill(
        "Find Minimum in Rotated Sorted Array",
        "Suppose an array of length n sorted in ascending order is rotated. Given the rotated array of unique elements, return the minimum element. Must run in O(log n) time.",
        "nc20_find_min_rotated",
      ),
      Drill(
        "Search in Rotated Sorted Array",
        "Given a rotated sorted array of distinct integers nums and an integer target, return the index of target, or -1 if it is not present. Must run in O(log n) time.",
        "nc21_search_rotated",
      ),
    ]),
  ]
}

/// One language's view of the catalogue. `lookup` is that language's generated
/// `by_stem`, adapted to what every language has in common: the solution
/// variants, and a Check where the language can be checked in the browser.
/// A subcategory none of whose stems resolve is dropped rather than shown
/// empty.
pub fn category(
  label: String,
  language: Language,
  lookup: fn(String) ->
    Result(#(List(#(String, String, String)), Option(Check)), Nil),
) -> Category {
  Category(
    label,
    groups()
      |> list.filter_map(fn(group: Group) {
        case
          list.filter_map(group.drills, fn(drill) {
            build(drill, language, lookup)
          })
        {
          [] -> Error(Nil)
          problems -> Ok(Subcategory(group.subcategory, problems))
        }
      }),
  )
}

fn build(
  drill: Drill,
  language: Language,
  lookup: fn(String) ->
    Result(#(List(#(String, String, String)), Option(Check)), Nil),
) -> Result(Problem, Nil) {
  use #(solutions, check) <- result.map(lookup(drill.stem))
  Problem(
    title: drill.title,
    prompt: drill.prompt,
    approach: approaches.for_title(drill.title),
    solutions: list.map(solutions, fn(s) {
      Solution(label: s.0, note: s.1, code: s.2)
    }),
    language: language,
    check: check,
    quiz: None,
  )
}
