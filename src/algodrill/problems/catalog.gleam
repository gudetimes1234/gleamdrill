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
    Group("2-D Dynamic Programming", [
      Drill(
        "Unique Paths",
        "A robot starts at the top-left of an m x n grid and may only move right or down. Return how many distinct paths it can take to the bottom-right corner.",
        "nc92_unique_paths",
      ),
      Drill(
        "Longest Common Subsequence",
        "Given two strings, return the length of their longest common subsequence. A subsequence keeps the relative order of characters but need not be contiguous.",
        "nc93_longest_common_subsequence",
      ),
      Drill(
        "Best Time to Buy and Sell Stock with Cooldown",
        "You may buy and sell a stock any number of times, but after selling you must wait one day before buying again. Return the maximum profit.",
        "nc96_stock_with_cooldown",
      ),
      Drill(
        "Coin Change II",
        "Given an amount and coin denominations of which you have an unlimited supply, return how many distinct combinations of coins make up that amount. Order does not distinguish combinations.",
        "nc94_coin_change_ii",
      ),
      Drill(
        "Target Sum",
        "Give every number in nums either a plus or a minus sign and concatenate them into an expression. Return how many assignments of signs evaluate to the target.",
        "nc95_target_sum",
      ),
      Drill(
        "Interleaving String",
        "Given strings s1, s2 and s3, return true if s3 can be formed by interleaving s1 and s2 while preserving the order of each.",
        "nc97_interleaving_string",
      ),
      Drill(
        "Longest Increasing Path in a Matrix",
        "Given an m x n matrix, return the length of the longest strictly increasing path. From a cell you may move up, down, left or right, but not diagonally or outside the grid.",
        "nc98_longest_increasing_path",
      ),
      Drill(
        "Distinct Subsequences",
        "Given strings s and t, return the number of distinct subsequences of s that equal t.",
        "nc99_distinct_subsequences",
      ),
      Drill(
        "Edit Distance",
        "Given two words, return the minimum number of single-character insertions, deletions or replacements needed to turn the first into the second.",
        "nc100_edit_distance",
      ),
      Drill(
        "Burst Balloons",
        "Balloons carry numbers. Bursting one earns the product of it and its two current neighbours, with a missing neighbour counting as 1. Return the most coins obtainable by bursting them all.",
        "nc101_burst_balloons",
      ),
      Drill(
        "Regular Expression Matching",
        "Implement matching for '.' which matches any single character and '*' which matches zero or more of the preceding element. The match must cover the whole input string.",
        "nc102_regular_expression_matching",
      ),
    ]),
    Group("Backtracking", [
      Drill(
        "Subsets",
        "Given an array of unique integers, return all possible subsets. The answer may be in any order and must not contain duplicates.",
        "nc83_subsets",
      ),
      Drill(
        "Combination Sum",
        "Given distinct candidate numbers and a target, return every unique combination of candidates summing to the target. The same candidate may be used any number of times.",
        "nc84_combination_sum",
      ),
      Drill(
        "Permutations",
        "Given an array of distinct integers, return all possible permutations, in any order.",
        "nc85_permutations",
      ),
      Drill(
        "Subsets II",
        "Given an array of integers that may contain duplicates, return all possible subsets with no duplicate subsets among them.",
        "nc86_subsets_ii",
      ),
      Drill(
        "Combination Sum II",
        "Given candidate numbers that may repeat and a target, return every unique combination summing to the target. Each candidate may be used at most once.",
        "nc87_combination_sum_ii",
      ),
      Drill(
        "Word Search",
        "Given a grid of letters and a word, return true if the word can be traced through horizontally or vertically neighbouring cells, using no cell more than once.",
        "nc88_word_search",
      ),
      Drill(
        "Palindrome Partitioning",
        "Given a string s, partition it so that every piece is a palindrome, and return all such partitions.",
        "nc89_palindrome_partitioning",
      ),
      Drill(
        "Letter Combinations of a Phone Number",
        "Given a string of digits from 2 to 9, return all the letter combinations the number could spell on a telephone keypad, in any order.",
        "nc90_letter_combinations",
      ),
      Drill(
        "N-Queens",
        "Place n queens on an n x n board so that none attacks another, and return every distinct solution as a list of rows, using 'Q' for a queen and '.' for an empty square.",
        "nc91_n_queens",
      ),
    ]),
    Group("Heap / Priority Queue", [
      Drill(
        "Kth Largest Element in a Stream",
        "Design a structure that tracks the kth largest value in a stream. It is built from k and an initial list, and each value added reports the kth largest so far.",
        "nc76_kth_largest_stream",
      ),
      Drill(
        "Last Stone Weight",
        "Each turn, smash the two heaviest stones together: equal stones destroy each other, otherwise the heavier is left with the difference. Return the weight of the last stone, or 0 if none remains.",
        "nc77_last_stone_weight",
      ),
      Drill(
        "K Closest Points to Origin",
        "Given points on a plane and an integer k, return the k points closest to the origin. The answer may be in any order.",
        "nc78_k_closest_points",
      ),
      Drill(
        "Kth Largest Element in an Array",
        "Given an integer array nums and an integer k, return the kth largest element. Duplicates count separately, so this is position in sorted order and not the kth distinct value.",
        "nc79_kth_largest_array",
      ),
      Drill(
        "Task Scheduler",
        "Given tasks labelled by letter and a cooldown n, where two runs of the same task must be at least n intervals apart, return the fewest intervals needed to run them all.",
        "nc80_task_scheduler",
      ),
      Drill(
        "Design Twitter",
        "Design a simplified Twitter: post a tweet, follow and unfollow a user, and fetch the ten most recent tweet ids in a user's feed, from themselves and everyone they follow, most recent first.",
        "nc81_design_twitter",
      ),
      Drill(
        "Find Median from Data Stream",
        "Design a structure that takes integers one at a time and can report the median of everything seen so far.",
        "nc82_find_median_stream",
      ),
    ]),
    Group("1-D Dynamic Programming", [
      Drill(
        "Climbing Stairs",
        "You are climbing a staircase of n steps, taking either one or two steps at a time. In how many distinct ways can you reach the top?",
        "nc64_climbing_stairs",
      ),
      Drill(
        "Min Cost Climbing Stairs",
        "You are given an array cost where cost[i] is what it costs to step off step i. You may start at step 0 or step 1, and may climb one or two steps. Return the minimum cost to reach the top.",
        "nc65_min_cost_climbing_stairs",
      ),
      Drill(
        "House Robber",
        "Given an array of amounts of money in a row of houses, return the most you can rob without ever robbing two adjacent houses.",
        "nc66_house_robber",
      ),
      Drill(
        "House Robber II",
        "The same as House Robber, except the houses are arranged in a circle, so the first and last are adjacent.",
        "nc67_house_robber_ii",
      ),
      Drill(
        "Longest Palindromic Substring",
        "Given a string s, return the longest palindromic substring in s.",
        "nc68_longest_palindrome",
      ),
      Drill(
        "Palindromic Substrings",
        "Given a string s, return the number of palindromic substrings in it. Substrings at different positions count separately even if they read the same.",
        "nc69_palindromic_substrings",
      ),
      Drill(
        "Decode Ways",
        "A message of digits was encoded with A as 1 through Z as 26. Given the digit string, return the number of ways to decode it. A leading zero is never a valid encoding.",
        "nc70_decode_ways",
      ),
      Drill(
        "Coin Change",
        "Given coin denominations and a target amount, return the fewest coins that make up that amount, or -1 if no combination does. You have an unlimited supply of each coin.",
        "nc71_coin_change",
      ),
      Drill(
        "Maximum Product Subarray",
        "Given an integer array nums, find the contiguous subarray with the largest product and return that product.",
        "nc72_maximum_product_subarray",
      ),
      Drill(
        "Word Break",
        "Given a string s and a dictionary of words, return true if s can be segmented into a sequence of one or more dictionary words. Words may be reused.",
        "nc73_word_break",
      ),
      Drill(
        "Longest Increasing Subsequence",
        "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
        "nc74_longest_increasing_subsequence",
      ),
      Drill(
        "Partition Equal Subset Sum",
        "Given an integer array nums, return true if it can be split into two subsets with equal sums.",
        "nc75_partition_equal_subset",
      ),
    ]),
    Group("Math & Geometry", [
      Drill(
        "Rotate Image",
        "Given an n x n matrix representing an image, rotate it by 90 degrees clockwise and return the result.",
        "nc56_rotate_image",
      ),
      Drill(
        "Spiral Matrix",
        "Given an m x n matrix, return all its elements in spiral order: left to right along the top, down the right side, back along the bottom, up the left, and inwards.",
        "nc57_spiral_matrix",
      ),
      Drill(
        "Set Matrix Zeroes",
        "Given an m x n matrix, if any element is 0 set its entire row and column to 0, and return the result.",
        "nc58_set_matrix_zeroes",
      ),
      Drill(
        "Happy Number",
        "A number is happy if repeatedly replacing it with the sum of the squares of its digits eventually reaches 1. Return true if the given number is happy.",
        "nc59_happy_number",
      ),
      Drill(
        "Plus One",
        "You are given a large integer as an array of its digits, most significant first. Increment it by one and return the resulting digits.",
        "nc60_plus_one",
      ),
      Drill(
        "Pow(x, n)",
        "Implement pow(x, n), which raises x to the power n, where n may be negative.",
        "nc61_pow",
      ),
      Drill(
        "Multiply Strings",
        "Given two non-negative integers represented as strings, return their product as a string. You may not convert the inputs to integers directly.",
        "nc62_multiply_strings",
      ),
      Drill(
        "Detect Squares",
        "Design a structure that accepts points on a plane and, given a query point, counts the axis-aligned squares having that point as one corner and three previously added points as the others.",
        "nc63_detect_squares",
      ),
    ]),
    Group("Bit Manipulation", [
      Drill(
        "Single Number",
        "Given a non-empty array of integers where every element appears twice except for one, find that single one. Your solution should run in linear time and use constant extra space.",
        "nc49_single_number",
      ),
      Drill(
        "Number of 1 Bits",
        "Given an unsigned integer, return the number of bits set to 1 in its binary representation.",
        "nc50_number_of_one_bits",
      ),
      Drill(
        "Counting Bits",
        "Given an integer n, return an array of length n + 1 where the entry at index i is the number of 1 bits in the binary representation of i.",
        "nc51_counting_bits",
      ),
      Drill(
        "Reverse Bits",
        "Reverse the bits of a given 32-bit unsigned integer.",
        "nc52_reverse_bits",
      ),
      Drill(
        "Missing Number",
        "Given an array containing n distinct numbers taken from 0 to n, return the one that is missing.",
        "nc53_missing_number",
      ),
      Drill(
        "Sum of Two Integers",
        "Given two integers a and b, return their sum without using the operators + and -.",
        "nc54_sum_of_two_integers",
      ),
      Drill(
        "Reverse Integer",
        "Given a signed 32-bit integer x, return x with its digits reversed. If reversing it would fall outside the signed 32-bit range, return 0.",
        "nc55_reverse_integer",
      ),
    ]),
    Group("Greedy", [
      Drill(
        "Maximum Subarray",
        "Given an integer array nums, find the contiguous subarray with the largest sum and return that sum.",
        "nc41_maximum_subarray",
      ),
      Drill(
        "Jump Game",
        "You are given an integer array nums. Each element is the maximum jump length from that position. Return true if you can reach the last index.",
        "nc42_jump_game",
      ),
      Drill(
        "Jump Game II",
        "You are given an array nums where each element is the maximum jump length from that position, and the last index is always reachable. Return the minimum number of jumps to get there.",
        "nc43_jump_game_ii",
      ),
      Drill(
        "Gas Station",
        "There are n gas stations in a circle. gas[i] is the fuel at station i and cost[i] is what it takes to travel to the next. Starting with an empty tank, return the index to start from to get all the way round, or -1 if there is none.",
        "nc44_gas_station",
      ),
      Drill(
        "Hand of Straights",
        "Given an array of card values and a group size, determine whether the hand can be rearranged into groups of that size, each made of consecutive values.",
        "nc45_hand_of_straights",
      ),
      Drill(
        "Merge Triplets to Form Target Triplet",
        "You may repeatedly pick two triplets and replace one with their componentwise maximum. Return true if the target triplet can be produced from the given triplets.",
        "nc46_merge_triplets",
      ),
      Drill(
        "Partition Labels",
        "Partition a string into as many pieces as possible so that each letter appears in at most one piece. Return the sizes of those pieces, in order.",
        "nc47_partition_labels",
      ),
      Drill(
        "Valid Parenthesis String",
        "Given a string containing only the characters '(', ')' and '*', where a star may stand for an opening bracket, a closing bracket, or nothing at all, return true if the string can be read as valid.",
        "nc48_valid_parenthesis_string",
      ),
    ]),
    Group("Intervals", [
      Drill(
        "Insert Interval",
        "You are given a list of non-overlapping intervals sorted by start, and one new interval. Insert it so the list stays sorted and non-overlapping, merging where necessary.",
        "nc35_insert_interval",
      ),
      Drill(
        "Merge Intervals",
        "Given an array of intervals, merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the input intervals.",
        "nc36_merge_intervals",
      ),
      Drill(
        "Non-overlapping Intervals",
        "Given an array of intervals, return the minimum number of intervals you need to remove to make the rest non-overlapping. Intervals that only touch at a point do not overlap.",
        "nc37_non_overlapping",
      ),
      Drill(
        "Meeting Rooms",
        "Given an array of meeting time intervals, determine whether a person could attend all of them. A meeting ending exactly as another begins is fine.",
        "nc38_meeting_rooms",
      ),
      Drill(
        "Meeting Rooms II",
        "Given an array of meeting time intervals, return the minimum number of rooms required to hold them all. A room freed exactly as another meeting begins can be reused.",
        "nc39_meeting_rooms_ii",
      ),
      Drill(
        "Minimum Interval to Include Each Query",
        "You are given intervals and an array of queries. For each query, return the length of the smallest interval containing it, or -1 if no interval does. An interval's length is end minus start plus one.",
        "nc40_min_interval",
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
        "Evaluate Reverse Polish Notation",
        "You are given an array of strings tokens representing an arithmetic expression in Reverse Polish Notation. Evaluate it and return an integer. Division between two integers truncates towards zero.",
        "nc27_eval_rpn",
      ),
      Drill(
        "Generate Parentheses",
        "Given n pairs of parentheses, generate all combinations of well-formed parentheses. The answer may be returned in any order.",
        "nc28_generate_parentheses",
      ),
      Drill(
        "Daily Temperatures",
        "Given an array of integers temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.",
        "nc18_daily_temperatures",
      ),
      Drill(
        "Car Fleet",
        "Cars head to the same destination at target. Car i starts at position[i] with speed[i], and a faster car catching a slower one joins it, moving at the slower speed. Return the number of fleets that arrive.",
        "nc29_car_fleet",
      ),
      Drill(
        "Largest Rectangle in Histogram",
        "Given an array of integers heights representing a histogram's bar heights, where each bar has width 1, return the area of the largest rectangle in the histogram.",
        "nc30_largest_rectangle",
      ),
    ]),
    Group("Binary Search", [
      Drill(
        "Binary Search",
        "Given a sorted array of integers nums and an integer target, write a function to search target in nums. Return its index, or -1 if it does not exist. Must run in O(log n) time.",
        "nc19_binary_search",
      ),
      Drill(
        "Search a 2D Matrix",
        "You are given an m x n integer matrix where each row is sorted in non-decreasing order and the first integer of each row is greater than the last integer of the row before. Return true if target is in the matrix.",
        "nc31_search_2d_matrix",
      ),
      Drill(
        "Koko Eating Bananas",
        "Koko has piles of bananas and h hours before the guards return. At a speed of k bananas per hour she eats k from one pile, and if the pile is smaller she eats it and stops for that hour. Return the smallest k that lets her finish in time.",
        "nc32_koko_bananas",
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
      Drill(
        "Time Based Key-Value Store",
        "Design a key-value store that keeps multiple values per key, each stamped with a time. set(key, value, timestamp) stores a value; get(key, timestamp) returns the value set at the largest time no later than timestamp, or the empty string if there is none.",
        "nc33_time_map",
      ),
      Drill(
        "Median of Two Sorted Arrays",
        "Given two sorted arrays nums1 and nums2, return the median of the two arrays combined.",
        "nc34_median_two_sorted",
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
