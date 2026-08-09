import algodrill/problem.{type Category, Category, Gleam, Problem, Subcategory}

pub fn category() -> Category {
  Category("NeetCode 150 (Gleam)", [
    Subcategory("Arrays & Hashing", [
      Problem(
        title: "Contains Duplicate",
        prompt: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct. Solve it in Gleam.",
        solution: "pub fn contains_duplicate(nums: List(Int)) -> Bool {
  check(nums, set.new())
}

fn check(nums: List(Int), seen: set.Set(Int)) -> Bool {
  case nums {
    [] -> False
    [n, ..rest] ->
      case set.contains(seen, n) {
        True -> True
        False -> check(rest, set.insert(seen, n))
      }
  }
}",
        language: Gleam,
      ),
      Problem(
        title: "Valid Anagram",
        prompt: "Given two strings s and t, return true if t is an anagram of s, and false otherwise. Solve it in Gleam.",
        solution: "pub fn is_anagram(s: String, t: String) -> Bool {
  counts(s) == counts(t)
}

fn counts(word: String) -> dict.Dict(String, Int) {
  string.to_graphemes(word)
  |> list.fold(dict.new(), fn(acc, g) {
    dict.upsert(acc, g, fn(n) { option.unwrap(n, 0) + 1 })
  })
}",
        language: Gleam,
      ),
      Problem(
        title: "Two Sum",
        prompt: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. Solve it in Gleam.",
        solution: "pub fn two_sum(nums: List(Int), target: Int) -> Result(#(Int, Int), Nil) {
  find_pair(nums, target, 0, dict.new())
}

fn find_pair(
  nums: List(Int),
  target: Int,
  i: Int,
  seen: dict.Dict(Int, Int),
) -> Result(#(Int, Int), Nil) {
  case nums {
    [] -> Error(Nil)
    [n, ..rest] ->
      case dict.get(seen, target - n) {
        Ok(j) -> Ok(#(j, i))
        Error(Nil) -> find_pair(rest, target, i + 1, dict.insert(seen, n, i))
      }
  }
}",
        language: Gleam,
      ),
      Problem(
        title: "Group Anagrams",
        prompt: "Given an array of strings strs, group the anagrams together. You can return the answer in any order. Solve it in Gleam.",
        solution: "pub fn group_anagrams(strs: List(String)) -> List(List(String)) {
  strs
  |> list.fold(dict.new(), fn(acc, s) {
    let key =
      string.to_graphemes(s)
      |> list.sort(string.compare)
      |> string.concat
    dict.upsert(acc, key, fn(group) {
      case group {
        option.Some(members) -> [s, ..members]
        option.None -> [s]
      }
    })
  })
  |> dict.values
  |> list.map(list.reverse)
}",
        language: Gleam,
      ),
      Problem(
        title: "Top K Frequent Elements",
        prompt: "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order. Note: Gleam's stdlib has no heap - counting then sorting by frequency is the idiomatic approach. Solve it in Gleam.",
        solution: "pub fn top_k_frequent(nums: List(Int), k: Int) -> List(Int) {
  nums
  |> list.fold(dict.new(), fn(acc, n) {
    dict.upsert(acc, n, fn(count) { option.unwrap(count, 0) + 1 })
  })
  |> dict.to_list
  |> list.sort(fn(a, b) { int.compare(b.1, a.1) })
  |> list.take(k)
  |> list.map(fn(pair) { pair.0 })
}",
        language: Gleam,
      ),
      Problem(
        title: "Product of Array Except Self",
        prompt: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. Solve without division and in O(n) time. Solve it in Gleam.",
        solution: "pub fn product_except_self(nums: List(Int)) -> List(Int) {
  let n = list.length(nums)
  let prefixes =
    [1, ..list.take(list.scan(nums, 1, fn(acc, x) { acc * x }), n - 1)]
  let suffixes =
    list.reverse(nums)
    |> list.scan(1, fn(acc, x) { acc * x })
    |> list.take(n - 1)
    |> fn(scanned) { [1, ..scanned] }
    |> list.reverse
  list.map2(prefixes, suffixes, fn(prefix, suffix) { prefix * suffix })
}",
        language: Gleam,
      ),
      Problem(
        title: "Longest Consecutive Sequence",
        prompt: "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time. Solve it in Gleam.",
        solution: "pub fn longest_consecutive(nums: List(Int)) -> Int {
  let all = set.from_list(nums)
  all
  |> set.to_list
  |> list.fold(0, fn(best, n) {
    case set.contains(all, n - 1) {
      True -> best
      False -> int.max(best, run_length(all, n, 0))
    }
  })
}

fn run_length(all: set.Set(Int), n: Int, count: Int) -> Int {
  case set.contains(all, n) {
    True -> run_length(all, n + 1, count + 1)
    False -> count
  }
}",
        language: Gleam,
      ),
    ]),
    Subcategory("Two Pointers", [
      Problem(
        title: "Valid Palindrome",
        prompt: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Note: in Gleam, comparing the cleaned graphemes with their reverse is the idiomatic answer. Solve it in Gleam.",
        solution: "pub fn is_palindrome(s: String) -> Bool {
  let cleaned =
    string.lowercase(s)
    |> string.to_graphemes
    |> list.filter(is_alphanumeric)
  cleaned == list.reverse(cleaned)
}

fn is_alphanumeric(g: String) -> Bool {
  case string.to_utf_codepoints(g) {
    [c] -> {
      let n = string.utf_codepoint_to_int(c)
      is_digit(n) || is_lowercase_letter(n)
    }
    _ -> False
  }
}

fn is_digit(n: Int) -> Bool {
  n >= 48 && n <= 57
}

fn is_lowercase_letter(n: Int) -> Bool {
  n >= 97 && n <= 122
}",
        language: Gleam,
      ),
      Problem(
        title: "Two Sum II - Input Array Is Sorted",
        prompt: "Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the two indices, 1-indexed. Note: Gleam lists have no O(1) indexing - encode the two pointers as recursion over the list and its reverse. Solve it in Gleam.",
        solution: "pub fn two_sum_sorted(
  numbers: List(Int),
  target: Int,
) -> Result(#(Int, Int), Nil) {
  search(numbers, list.reverse(numbers), 1, list.length(numbers), target)
}

fn search(
  from_left: List(Int),
  from_right: List(Int),
  lo: Int,
  hi: Int,
  target: Int,
) -> Result(#(Int, Int), Nil) {
  case from_left, from_right {
    [left, ..left_rest], [right, ..right_rest] ->
      case lo >= hi {
        True -> Error(Nil)
        False ->
          case int.compare(left + right, target) {
            order.Eq -> Ok(#(lo, hi))
            order.Lt -> search(left_rest, from_right, lo + 1, hi, target)
            order.Gt -> search(from_left, right_rest, lo, hi - 1, target)
          }
      }
    _, _ -> Error(Nil)
  }
}",
        language: Gleam,
      ),
      Problem(
        title: "3Sum",
        prompt: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i, j, and k are distinct and the sum is 0. The solution set must not contain duplicate triplets. Note: Gleam lists have no O(1) indexing - encode the two pointers as recursion over the list and its reverse. Solve it in Gleam.",
        solution: "pub fn three_sum(nums: List(Int)) -> List(#(Int, Int, Int)) {
  let sorted = list.sort(nums, int.compare)
  outer(sorted, set.new())
  |> set.to_list
}

fn outer(
  nums: List(Int),
  acc: set.Set(#(Int, Int, Int)),
) -> set.Set(#(Int, Int, Int)) {
  case nums {
    [] -> acc
    [first, ..rest] ->
      outer(rest, inner(first, rest, list.reverse(rest), list.length(rest), acc))
  }
}

fn inner(
  first: Int,
  from_left: List(Int),
  from_right: List(Int),
  remaining: Int,
  acc: set.Set(#(Int, Int, Int)),
) -> set.Set(#(Int, Int, Int)) {
  case remaining < 2 {
    True -> acc
    False ->
      case from_left, from_right {
        [left, ..left_rest], [right, ..right_rest] ->
          case int.compare(first + left + right, 0) {
            order.Eq ->
              inner(
                first,
                left_rest,
                from_right,
                remaining - 1,
                set.insert(acc, #(first, left, right)),
              )
            order.Lt -> inner(first, left_rest, from_right, remaining - 1, acc)
            order.Gt -> inner(first, from_left, right_rest, remaining - 1, acc)
          }
        _, _ -> acc
      }
  }
}",
        language: Gleam,
      ),
      Problem(
        title: "Container With Most Water",
        prompt: "You are given an integer array height of length n. Find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water a container can store. Note: Gleam lists have no O(1) indexing - encode the two pointers as recursion over the list and its reverse. Solve it in Gleam.",
        solution: "pub fn max_area(heights: List(Int)) -> Int {
  converge(heights, list.reverse(heights), list.length(heights) - 1, 0)
}

fn converge(
  from_left: List(Int),
  from_right: List(Int),
  width: Int,
  best: Int,
) -> Int {
  case width <= 0 {
    True -> best
    False ->
      case from_left, from_right {
        [left, ..left_rest], [right, ..right_rest] -> {
          let area = int.min(left, right) * width
          let best = int.max(best, area)
          case left < right {
            True -> converge(left_rest, from_right, width - 1, best)
            False -> converge(from_left, right_rest, width - 1, best)
          }
        }
        _, _ -> best
      }
  }
}",
        language: Gleam,
      ),
    ]),
    Subcategory("Sliding Window", [
      Problem(
        title: "Best Time to Buy and Sell Stock",
        prompt: "You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize your profit by choosing a single day to buy and a different day in the future to sell. Solve it in Gleam.",
        solution: "pub fn max_profit(prices: List(Int)) -> Int {
  case prices {
    [] -> 0
    [first, ..rest] -> {
      let #(_, best) =
        list.fold(rest, #(first, 0), fn(acc, price) {
          let #(min_price, best) = acc
          #(int.min(min_price, price), int.max(best, price - min_price))
        })
      best
    }
  }
}",
        language: Gleam,
      ),
      Problem(
        title: "Longest Substring Without Repeating Characters",
        prompt: "Given a string s, find the length of the longest substring without repeating characters. Solve it in Gleam.",
        solution: "pub fn length_of_longest_substring(s: String) -> Int {
  let #(_, _, best) =
    string.to_graphemes(s)
    |> list.index_fold(#(dict.new(), 0, 0), fn(acc, g, i) {
      let #(last_seen, start, best) = acc
      let start = case dict.get(last_seen, g) {
        Ok(j) if j >= start -> j + 1
        _ -> start
      }
      #(dict.insert(last_seen, g, i), start, int.max(best, i - start + 1))
    })
  best
}",
        language: Gleam,
      ),
      Problem(
        title: "Longest Repeating Character Replacement",
        prompt: "You are given a string s and an integer k. You can change any character to any other uppercase English character at most k times. Return the length of the longest substring containing the same letter you can get. Solve it in Gleam.",
        solution: "pub fn character_replacement(s: String, k: Int) -> Int {
  let #(_, _, best) =
    string.to_graphemes(s)
    |> list.fold(#(dict.new(), [], 0), fn(acc, g) {
      let #(counts, window, best) = acc
      let counts = dict.upsert(counts, g, fn(n) { option.unwrap(n, 0) + 1 })
      let window = list.append(window, [g])
      let #(counts, window) = shrink(counts, window, k)
      #(counts, window, int.max(best, list.length(window)))
    })
  best
}

fn shrink(
  counts: dict.Dict(String, Int),
  window: List(String),
  k: Int,
) -> #(dict.Dict(String, Int), List(String)) {
  let size = list.length(window)
  let max_count = dict.fold(counts, 0, fn(top, _, count) { int.max(top, count) })
  case size - max_count > k, window {
    True, [oldest, ..rest] ->
      shrink(
        dict.upsert(counts, oldest, fn(n) { option.unwrap(n, 1) - 1 }),
        rest,
        k,
      )
    _, _ -> #(counts, window)
  }
}",
        language: Gleam,
      ),
      Problem(
        title: "Permutation in String",
        prompt: "Given two strings s1 and s2, return true if s2 contains a permutation of s1. In other words, return true if one of s1's permutations is a substring of s2. Solve it in Gleam.",
        solution: "pub fn check_inclusion(s1: String, s2: String) -> Bool {
  let needle = counts(string.to_graphemes(s1))
  let size = string.length(s1)
  let graphemes = string.to_graphemes(s2)
  slide(
    graphemes,
    list.drop(graphemes, size),
    counts(list.take(graphemes, size)),
    needle,
  )
}

fn counts(graphemes: List(String)) -> dict.Dict(String, Int) {
  list.fold(graphemes, dict.new(), fn(acc, g) {
    dict.upsert(acc, g, fn(n) { option.unwrap(n, 0) + 1 })
  })
}

fn slide(
  window_start: List(String),
  upcoming: List(String),
  window: dict.Dict(String, Int),
  needle: dict.Dict(String, Int),
) -> Bool {
  case window == needle {
    True -> True
    False ->
      case window_start, upcoming {
        [oldest, ..rest_start], [next, ..rest_upcoming] ->
          slide(
            rest_start,
            rest_upcoming,
            window
              |> remove_one(oldest)
              |> dict.upsert(next, fn(n) { option.unwrap(n, 0) + 1 }),
            needle,
          )
        _, _ -> False
      }
  }
}

fn remove_one(
  window: dict.Dict(String, Int),
  g: String,
) -> dict.Dict(String, Int) {
  case dict.get(window, g) {
    Ok(1) -> dict.delete(window, g)
    Ok(n) -> dict.insert(window, g, n - 1)
    Error(Nil) -> window
  }
}",
        language: Gleam,
      ),
    ]),
    Subcategory("Stack", [
      Problem(
        title: "Valid Parentheses",
        prompt: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. Solve it in Gleam.",
        solution: "pub fn is_valid(s: String) -> Bool {
  check(string.to_graphemes(s), [])
}

fn check(graphemes: List(String), stack: List(String)) -> Bool {
  case graphemes, stack {
    [], [] -> True
    [], _ -> False
    [\"(\", ..rest], _ -> check(rest, [\")\", ..stack])
    [\"[\", ..rest], _ -> check(rest, [\"]\", ..stack])
    [\"{\", ..rest], _ -> check(rest, [\"}\", ..stack])
    [close, ..rest], [expected, ..stack_rest] ->
      close == expected && check(rest, stack_rest)
    _, _ -> False
  }
}",
        language: Gleam,
      ),
      Problem(
        title: "Min Stack",
        prompt: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time. Note: model the stack as a list of #(value, min_so_far) tuples returned from each operation. Solve it in Gleam.",
        solution: "pub type MinStack {
  MinStack(entries: List(#(Int, Int)))
}

pub fn new() -> MinStack {
  MinStack([])
}

pub fn push(stack: MinStack, value: Int) -> MinStack {
  let min = case stack.entries {
    [#(_, current_min), ..] -> int.min(value, current_min)
    [] -> value
  }
  MinStack([#(value, min), ..stack.entries])
}

pub fn pop(stack: MinStack) -> MinStack {
  case stack.entries {
    [_, ..rest] -> MinStack(rest)
    [] -> stack
  }
}

pub fn top(stack: MinStack) -> Result(Int, Nil) {
  case stack.entries {
    [#(value, _), ..] -> Ok(value)
    [] -> Error(Nil)
  }
}

pub fn get_min(stack: MinStack) -> Result(Int, Nil) {
  case stack.entries {
    [#(_, min), ..] -> Ok(min)
    [] -> Error(Nil)
  }
}",
        language: Gleam,
      ),
      Problem(
        title: "Daily Temperatures",
        prompt: "Given an array of integers temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. Solve it in Gleam.",
        solution: "pub fn daily_temperatures(temps: List(Int)) -> List(Int) {
  let #(answers, _) =
    temps
    |> list.index_fold(#(dict.new(), []), fn(acc, temp, i) {
      let #(answers, stack) = acc
      let #(answers, stack) = pop_colder(answers, stack, temp, i)
      #(answers, [#(i, temp), ..stack])
    })
  list.index_map(temps, fn(_, i) {
    case dict.get(answers, i) {
      Ok(days) -> days
      Error(Nil) -> 0
    }
  })
}

fn pop_colder(
  answers: dict.Dict(Int, Int),
  stack: List(#(Int, Int)),
  temp: Int,
  i: Int,
) -> #(dict.Dict(Int, Int), List(#(Int, Int))) {
  case stack {
    [#(j, colder), ..rest] if colder < temp ->
      pop_colder(dict.insert(answers, j, i - j), rest, temp, i)
    _ -> #(answers, stack)
  }
}",
        language: Gleam,
      ),
    ]),
    Subcategory("Binary Search", [
      Problem(
        title: "Binary Search",
        prompt: "Given a sorted array of integers nums and an integer target, write a function to search target in nums. Return its index, or -1 if it does not exist. Must run in O(log n) time. Note: these drills halve with list.split to practice the algorithm; real Gleam code would use an array package like iv or glearray. Solve it in Gleam.",
        solution: "pub fn search(nums: List(Int), target: Int) -> Result(Int, Nil) {
  halve(nums, target, 0)
}

fn halve(nums: List(Int), target: Int, offset: Int) -> Result(Int, Nil) {
  case nums {
    [] -> Error(Nil)
    _ -> {
      let half = list.length(nums) / 2
      let #(left, right) = list.split(nums, half)
      case right {
        [mid, ..after] ->
          case int.compare(target, mid) {
            order.Eq -> Ok(offset + half)
            order.Lt -> halve(left, target, offset)
            order.Gt -> halve(after, target, offset + half + 1)
          }
        [] -> Error(Nil)
      }
    }
  }
}",
        language: Gleam,
      ),
      Problem(
        title: "Find Minimum in Rotated Sorted Array",
        prompt: "Suppose an array of length n sorted in ascending order is rotated. Given the rotated array of unique elements, return the minimum element. Must run in O(log n) time. Note: these drills halve with list.split to practice the algorithm; real Gleam code would use an array package like iv or glearray. Solve it in Gleam.",
        solution: "pub fn find_min(nums: List(Int)) -> Result(Int, Nil) {
  case nums {
    [] -> Error(Nil)
    [only] -> Ok(only)
    [a, b] -> Ok(int.min(a, b))
    _ -> {
      use first <- result.try(list.first(nums))
      use last <- result.try(list.last(nums))
      case first <= last {
        // This segment is fully sorted: the rotation point is not inside it.
        True -> Ok(first)
        False -> {
          let half = list.length(nums) / 2
          let #(left, right) = list.split(nums, half)
          case right {
            [mid, ..after] ->
              case mid >= first {
                // Left half sorted: the minimum is past the midpoint.
                True -> find_min(after)
                // Rotation point is in the left half, up to and including mid.
                False -> find_min(list.append(left, [mid]))
              }
            [] -> Error(Nil)
          }
        }
      }
    }
  }
}",
        language: Gleam,
      ),
      Problem(
        title: "Search in Rotated Sorted Array",
        prompt: "Given a rotated sorted array of distinct integers nums and an integer target, return the index of target, or -1 if it is not present. Must run in O(log n) time. Note: these drills halve with list.split to practice the algorithm; real Gleam code would use an array package like iv or glearray. Solve it in Gleam.",
        solution: "pub fn search_rotated(nums: List(Int), target: Int) -> Result(Int, Nil) {
  halve(nums, target, 0)
}

fn halve(nums: List(Int), target: Int, offset: Int) -> Result(Int, Nil) {
  case nums {
    [] -> Error(Nil)
    [only] ->
      case only == target {
        True -> Ok(offset)
        False -> Error(Nil)
      }
    _ -> {
      let half = list.length(nums) / 2
      let #(left, right) = list.split(nums, half)
      use first <- result.try(list.first(nums))
      use last <- result.try(list.last(nums))
      case right {
        [mid, ..after] ->
          case mid == target {
            True -> Ok(offset + half)
            False ->
              case first <= mid {
                // Left half is sorted.
                True ->
                  case first <= target && target < mid {
                    True -> halve(left, target, offset)
                    False -> halve(after, target, offset + half + 1)
                  }
                // Right half is sorted.
                False ->
                  case mid < target && target <= last {
                    True -> halve(after, target, offset + half + 1)
                    False -> halve(left, target, offset)
                  }
              }
          }
        [] -> Error(Nil)
      }
    }
  }
}",
        language: Gleam,
      ),
    ]),
  ])
}
