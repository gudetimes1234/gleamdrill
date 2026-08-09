import algodrill/problem.{
  type Category, type Problem, Category, Problem, Solution, Subcategory,
  TypeScript,
}
import algodrill/problems/approaches
import algodrill/problems/embedded.{type Embedded}
import algodrill/problems/embedded_ts
import gleam/list
import gleam/option.{Some}

pub fn category() -> Category {
  Category("NeetCode 150 (TypeScript)", [
    Subcategory("Arrays & Hashing", [
      drill(
        "Contains Duplicate",
        "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
        embedded_ts.nc01_contains_duplicate(),
      ),
      drill(
        "Two Sum",
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        embedded_ts.nc03_two_sum(),
      ),
    ]),
    Subcategory("Two Pointers", [
      drill(
        "Valid Palindrome",
        "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
        embedded_ts.nc08_valid_palindrome(),
      ),
    ]),
    Subcategory("Sliding Window", [
      drill(
        "Best Time to Buy and Sell Stock",
        "You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize your profit by choosing a single day to buy and a different day in the future to sell.",
        embedded_ts.nc12_best_time_stock(),
      ),
    ]),
    Subcategory("Stack", [
      drill(
        "Valid Parentheses",
        "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        embedded_ts.nc16_valid_parentheses(),
      ),
    ]),
    Subcategory("Binary Search", [
      drill(
        "Binary Search",
        "Given a sorted array of integers nums and an integer target, write a function to search target in nums. Return its index, or -1 if it does not exist. Must run in O(log n) time.",
        embedded_ts.nc19_binary_search(),
      ),
    ]),
  ])
}

fn drill(title: String, prompt: String, e: Embedded) -> Problem {
  Problem(
    title: title,
    prompt: prompt,
    approach: approaches.for_title(title),
    solutions: list.map(e.solutions, fn(s) { Solution(label: s.0, code: s.1) }),
    language: TypeScript,
    check: Some(e.check),
  )
}
