//// Runs every reference solution — primaries and alternates alike — against
//// the same expectations, natively. Run from drills/: `gleam run -m solutions`.
////
//// Each drill's expectations live in one `check_*` function taking the
//// implementation as an argument, so adding an alternate is an import plus one
//// call rather than a copy of the assertions. Where a drill owns a type
//// (min stack, config, player) the check is generic over it and takes a
//// projection down to plain values.

import gleam/dict
import gleam/int
import gleam/io
import gleam/list
import gleam/string
import nc01_contains_duplicate
import nc01_contains_duplicate__sorting
import nc02_valid_anagram
import nc02_valid_anagram__sorting
import nc03_two_sum
import nc03_two_sum__brute_force
import nc03_two_sum__sorted_two_pointer
import nc04_group_anagrams
import nc04_group_anagrams__count_key
import nc05_top_k_frequent
import nc05_top_k_frequent__bucket_sort
import nc06_product_except_self
import nc06_product_except_self__brute_force
import nc07_longest_consecutive
import nc07_longest_consecutive__sorting
import nc08_valid_palindrome
import nc08_valid_palindrome__two_pointers
import nc09_two_sum_sorted
import nc09_two_sum_sorted__binary_search
import nc10_three_sum
import nc10_three_sum__brute_force
import nc11_container_water
import nc11_container_water__brute_force
import nc12_best_time_stock
import nc12_best_time_stock__brute_force
import nc13_longest_substring
import nc13_longest_substring__shrinking_window
import nc14_character_replacement
import nc14_character_replacement__per_character
import nc15_permutation_in_string
import nc15_permutation_in_string__sorted_windows
import nc16_valid_parentheses
import nc16_valid_parentheses__reduction
import nc17_min_stack
import nc17_min_stack__two_stacks
import nc18_daily_temperatures
import nc18_daily_temperatures__brute_force
import nc19_binary_search
import nc19_binary_search__first_match_scan
import nc20_find_min_rotated
import nc20_find_min_rotated__linear_scan
import nc21_search_rotated
import nc21_search_rotated__find_pivot
import nc22_encode_decode
import nc22_encode_decode__escaping
import nc23_valid_sudoku
import nc23_valid_sudoku__by_unit
import nc24_trapping_rain_water
import nc24_trapping_rain_water__prefix_maxima
import tip01_list_patterns
import tip01_list_patterns__stdlib
import tip02_tail_recursion
import tip02_tail_recursion__fold
import tip03_fold
import tip03_fold__explicit_recursion
import tip04_frequency_maps
import tip04_frequency_maps__sorted_runs
import tip05_result_chains
import tip05_result_chains__nested_case
import tip06_option
import tip06_option__case_on_result
import tip07_string_patterns
import tip07_string_patterns__prefix_functions
import tip08_pipelines
import tip08_pipelines__nested_calls
import tip09_records
import tip09_records__explicit_fields
import tip10_set_dedupe
import tip10_set_dedupe__list_contains

pub fn main() {
  let variants = [
    // NeetCode 150
    check_contains_duplicate(nc01_contains_duplicate.contains_duplicate),
    check_contains_duplicate(
      nc01_contains_duplicate__sorting.contains_duplicate,
    ),
    check_valid_anagram(nc02_valid_anagram.is_anagram),
    check_valid_anagram(nc02_valid_anagram__sorting.is_anagram),
    check_two_sum(nc03_two_sum.two_sum),
    check_two_sum(nc03_two_sum__brute_force.two_sum),
    check_two_sum(nc03_two_sum__sorted_two_pointer.two_sum),
    check_group_anagrams(nc04_group_anagrams.group_anagrams),
    check_group_anagrams(nc04_group_anagrams__count_key.group_anagrams),
    check_top_k_frequent(nc05_top_k_frequent.top_k_frequent),
    check_top_k_frequent(nc05_top_k_frequent__bucket_sort.top_k_frequent),
    check_product_except_self(nc06_product_except_self.product_except_self),
    check_product_except_self(
      nc06_product_except_self__brute_force.product_except_self,
    ),
    check_longest_consecutive(nc07_longest_consecutive.longest_consecutive),
    check_longest_consecutive(
      nc07_longest_consecutive__sorting.longest_consecutive,
    ),
    check_valid_palindrome(nc08_valid_palindrome.is_palindrome),
    check_valid_palindrome(nc08_valid_palindrome__two_pointers.is_palindrome),
    check_two_sum_sorted(nc09_two_sum_sorted.two_sum_sorted),
    check_two_sum_sorted(nc09_two_sum_sorted__binary_search.two_sum_sorted),
    check_three_sum(nc10_three_sum.three_sum),
    check_three_sum(nc10_three_sum__brute_force.three_sum),
    check_container_water(nc11_container_water.max_area),
    check_container_water(nc11_container_water__brute_force.max_area),
    check_best_time_stock(nc12_best_time_stock.max_profit),
    check_best_time_stock(nc12_best_time_stock__brute_force.max_profit),
    check_longest_substring(nc13_longest_substring.length_of_longest_substring),
    check_longest_substring(
      nc13_longest_substring__shrinking_window.length_of_longest_substring,
    ),
    check_character_replacement(
      nc14_character_replacement.character_replacement,
    ),
    check_character_replacement(
      nc14_character_replacement__per_character.character_replacement,
    ),
    check_permutation_in_string(nc15_permutation_in_string.check_inclusion),
    check_permutation_in_string(
      nc15_permutation_in_string__sorted_windows.check_inclusion,
    ),
    check_valid_parentheses(nc16_valid_parentheses.is_valid),
    check_valid_parentheses(nc16_valid_parentheses__reduction.is_valid),
    check_min_stack(
      nc17_min_stack.new,
      nc17_min_stack.push,
      nc17_min_stack.pop,
      nc17_min_stack.top,
      nc17_min_stack.get_min,
    ),
    check_min_stack(
      nc17_min_stack__two_stacks.new,
      nc17_min_stack__two_stacks.push,
      nc17_min_stack__two_stacks.pop,
      nc17_min_stack__two_stacks.top,
      nc17_min_stack__two_stacks.get_min,
    ),
    check_daily_temperatures(nc18_daily_temperatures.daily_temperatures),
    check_daily_temperatures(
      nc18_daily_temperatures__brute_force.daily_temperatures,
    ),
    check_binary_search(nc19_binary_search.search),
    check_binary_search(nc19_binary_search__first_match_scan.search),
    check_find_min_rotated(nc20_find_min_rotated.find_min),
    check_find_min_rotated(nc20_find_min_rotated__linear_scan.find_min),
    check_search_rotated(nc21_search_rotated.search_rotated),
    check_search_rotated(nc21_search_rotated__find_pivot.search_rotated),
    check_encode_decode(nc22_encode_decode.encode, nc22_encode_decode.decode),
    check_encode_decode(
      nc22_encode_decode__escaping.encode,
      nc22_encode_decode__escaping.decode,
    ),
    check_valid_sudoku(nc23_valid_sudoku.is_valid_sudoku),
    check_valid_sudoku(nc23_valid_sudoku__by_unit.is_valid_sudoku),
    check_trapping_rain_water(nc24_trapping_rain_water.trap),
    check_trapping_rain_water(nc24_trapping_rain_water__prefix_maxima.trap),

    // Gleam Tips
    check_list_patterns(tip01_list_patterns.length, tip01_list_patterns.last),
    check_list_patterns(
      tip01_list_patterns__stdlib.length,
      tip01_list_patterns__stdlib.last,
    ),
    check_tail_recursion(tip02_tail_recursion.reverse, tip02_tail_recursion.sum),
    check_tail_recursion(
      tip02_tail_recursion__fold.reverse,
      tip02_tail_recursion__fold.sum,
    ),
    check_fold(tip03_fold.max, tip03_fold.count_if, tip03_fold.running_total),
    check_fold(
      tip03_fold__explicit_recursion.max,
      tip03_fold__explicit_recursion.count_if,
      tip03_fold__explicit_recursion.running_total,
    ),
    check_frequency_maps(tip04_frequency_maps.word_frequencies),
    check_frequency_maps(tip04_frequency_maps__sorted_runs.word_frequencies),
    check_result_chains(tip05_result_chains.parse_config, fn(config) {
      let tip05_result_chains.Config(host, port, timeout) = config
      #(host, port, timeout)
    }),
    check_result_chains(
      tip05_result_chains__nested_case.parse_config,
      fn(config) {
        let tip05_result_chains__nested_case.Config(host, port, timeout) =
          config
        #(host, port, timeout)
      },
    ),
    check_option(tip06_option.port_description),
    check_option(tip06_option__case_on_result.port_description),
    check_string_patterns(
      tip07_string_patterns.strip_comment,
      tip07_string_patterns.initials,
    ),
    check_string_patterns(
      tip07_string_patterns__prefix_functions.strip_comment,
      tip07_string_patterns__prefix_functions.initials,
    ),
    check_pipelines(tip08_pipelines.slug),
    check_pipelines(tip08_pipelines__nested_calls.slug),
    check_records(
      tip09_records.new_player,
      tip09_records.add_points,
      tip09_records.level_up,
      fn(player) {
        let tip09_records.Player(name, score, level) = player
        #(name, score, level)
      },
    ),
    check_records(
      tip09_records__explicit_fields.new_player,
      tip09_records__explicit_fields.add_points,
      tip09_records__explicit_fields.level_up,
      fn(player) {
        let tip09_records__explicit_fields.Player(name, score, level) = player
        #(name, score, level)
      },
    ),
    check_dedupe(tip10_set_dedupe.dedupe),
    check_dedupe(tip10_set_dedupe__list_contains.dedupe),
  ]

  io.println(
    int.to_string(list.length(variants))
    <> " solution variants passed their checks",
  )
}

// --- NeetCode 150 ----------------------------------------------------------

/// Only the round trip is specified — any encoding is legal as long as decode
/// undoes it — so the check runs both directions and never looks at the wire
/// format. The awkward inputs are the point: a string containing the encoding's
/// own delimiter, and the pair ([] against [""]) that a naive join cannot tell
/// apart.
fn check_encode_decode(
  encode: fn(List(String)) -> String,
  decode: fn(String) -> List(String),
) -> Nil {
  let round_trip = fn(strs) { decode(encode(strs)) }
  let assert True =
    round_trip(["neet", "code", "love", "you"])
    == ["neet", "code", "love", "you"]
  let assert True = round_trip([]) == []
  let assert True = round_trip(["", ""]) == ["", ""]
  let assert True = round_trip(["3#x", "a|b"]) == ["3#x", "a|b"]
  let assert True = round_trip(["\\", "|", "#"]) == ["\\", "|", "#"]
  Nil
}

/// Nine row strings rather than a 9x9 literal, and one changed cell per case:
/// a duplicate that is only in a row, only in a column, and only in a box, so a
/// solution that forgets one of the three units cannot pass.
fn check_valid_sudoku(f: fn(List(List(String))) -> Bool) -> Nil {
  let rows = [
    "53..7....", "6..195...", ".98....6.", "8...6...3", "4..8.3..1", "7...2...6",
    ".6....28.", "...419..5", "....8..79",
  ]
  let board = list.map(rows, string.to_graphemes)
  let with_cell = fn(r: Int, c: Int, value: String) {
    list.index_map(board, fn(row, i) {
      case i == r {
        False -> row
        True ->
          list.index_map(row, fn(cell, j) {
            case j == c {
              True -> value
              False -> cell
            }
          })
      }
    })
  }
  let assert True = f(board)
  let assert False = f(with_cell(0, 2, "5"))
  let assert False = f(with_cell(3, 0, "5"))
  let assert False = f(with_cell(2, 0, "3"))
  let assert True = f(list.repeat(list.repeat(".", 9), 9))
  Nil
}

fn check_trapping_rain_water(f: fn(List(Int)) -> Int) -> Nil {
  let assert True = f([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]) == 6
  let assert True = f([4, 2, 0, 3, 2, 5]) == 9
  let assert True = f([]) == 0
  let assert True = f([3]) == 0
  let assert True = f([2, 0, 2]) == 2
  // A slope holds nothing: there is no right-hand wall to trap against.
  let assert True = f([5, 4, 3, 2, 1]) == 0
  Nil
}

fn check_contains_duplicate(f: fn(List(Int)) -> Bool) -> Nil {
  let assert True = f([1, 2, 3, 1])
  let assert False = f([1, 2, 3, 4])
  let assert False = f([])
  let assert True = f([7, 7])
  Nil
}

fn check_valid_anagram(f: fn(String, String) -> Bool) -> Nil {
  let assert True = f("anagram", "nagaram")
  let assert False = f("rat", "car")
  let assert True = f("", "")
  let assert False = f("a", "ab")
  Nil
}

fn check_two_sum(f: fn(List(Int), Int) -> Result(#(Int, Int), Nil)) -> Nil {
  let assert Ok(#(0, 1)) = f([2, 7, 11, 15], 9)
  let assert Ok(#(1, 2)) = f([3, 2, 4], 6)
  let assert Ok(#(0, 1)) = f([3, 3], 6)
  let assert Error(Nil) = f([1, 2], 7)
  Nil
}

/// Mirrors harnesses/nc04_group_anagrams.gleam: neither the groups nor their
/// members have a meaningful order, so both are sorted before comparing.
fn check_group_anagrams(f: fn(List(String)) -> List(List(String))) -> Nil {
  let normalise = fn(groups: List(List(String))) {
    groups
    |> list.map(fn(group) {
      group |> list.sort(string.compare) |> string.join(",")
    })
    |> list.sort(string.compare)
  }
  let assert True =
    normalise(f(["eat", "tea", "tan", "ate", "nat", "bat"]))
    == ["ate,eat,tea", "bat", "nat,tan"]
  let assert True = normalise(f([])) == []
  let assert True = normalise(f(["a"])) == ["a"]
  Nil
}

fn check_top_k_frequent(f: fn(List(Int), Int) -> List(Int)) -> Nil {
  let assert True = f([1, 1, 1, 2, 2, 3], 2) == [1, 2]
  let assert True = f([1], 1) == [1]
  // The most frequent value is not the most recently seen one.
  let assert True = f([5, 5, 4, 4, 4, 3], 1) == [4]
  Nil
}

fn check_product_except_self(f: fn(List(Int)) -> List(Int)) -> Nil {
  let assert True = f([1, 2, 3, 4]) == [24, 12, 8, 6]
  let assert True = f([-1, 1, 0, -3, 3]) == [0, 0, 9, 0, 0]
  Nil
}

fn check_longest_consecutive(f: fn(List(Int)) -> Int) -> Nil {
  let assert True = f([100, 4, 200, 1, 3, 2]) == 4
  let assert True = f([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]) == 9
  let assert True = f([]) == 0
  Nil
}

fn check_valid_palindrome(f: fn(String) -> Bool) -> Nil {
  let assert True = f("A man, a plan, a canal: Panama")
  let assert False = f("race a car")
  let assert True = f(" ")
  Nil
}

fn check_two_sum_sorted(
  f: fn(List(Int), Int) -> Result(#(Int, Int), Nil),
) -> Nil {
  let assert Ok(#(1, 2)) = f([2, 7, 11, 15], 9)
  let assert Ok(#(1, 3)) = f([2, 3, 4], 6)
  let assert Error(Nil) = f([1, 2, 3], 100)
  Nil
}

fn check_three_sum(f: fn(List(Int)) -> List(#(Int, Int, Int))) -> Nil {
  let triples = f([-1, 0, 1, 2, -1, -4])
  let assert True = list.length(triples) == 2
  let assert True = list.contains(triples, #(-1, -1, 2))
  let assert True = list.contains(triples, #(-1, 0, 1))
  let assert True = f([0, 1, 1]) == []
  let assert True = f([0, 0, 0]) == [#(0, 0, 0)]
  Nil
}

fn check_container_water(f: fn(List(Int)) -> Int) -> Nil {
  let assert True = f([1, 8, 6, 2, 5, 4, 8, 3, 7]) == 49
  let assert True = f([1, 1]) == 1
  Nil
}

fn check_best_time_stock(f: fn(List(Int)) -> Int) -> Nil {
  let assert True = f([7, 1, 5, 3, 6, 4]) == 5
  let assert True = f([7, 6, 4, 3, 1]) == 0
  let assert True = f([]) == 0
  Nil
}

fn check_longest_substring(f: fn(String) -> Int) -> Nil {
  let assert True = f("abcabcbb") == 3
  let assert True = f("bbbbb") == 1
  let assert True = f("pwwkew") == 3
  let assert True = f("") == 0
  Nil
}

fn check_character_replacement(f: fn(String, Int) -> Int) -> Nil {
  let assert True = f("ABAB", 2) == 4
  let assert True = f("AABABBA", 1) == 4
  Nil
}

fn check_permutation_in_string(f: fn(String, String) -> Bool) -> Nil {
  let assert True = f("ab", "eidbaooo")
  let assert False = f("ab", "eidboaoo")
  let assert True = f("adc", "dcda")
  Nil
}

fn check_valid_parentheses(f: fn(String) -> Bool) -> Nil {
  let assert True = f("()[]{}")
  let assert False = f("(]")
  let assert False = f("([)]")
  let assert True = f("{[]}")
  let assert False = f("(")
  Nil
}

fn check_min_stack(
  new: fn() -> s,
  push: fn(s, Int) -> s,
  pop: fn(s) -> s,
  top: fn(s) -> Result(Int, Nil),
  get_min: fn(s) -> Result(Int, Nil),
) -> Nil {
  let stack =
    new()
    |> push(-2)
    |> push(0)
    |> push(-3)
  let assert Ok(-3) = get_min(stack)
  let stack = pop(stack)
  let assert Ok(0) = top(stack)
  let assert Ok(-2) = get_min(stack)
  let assert Error(Nil) = top(new())
  Nil
}

fn check_daily_temperatures(f: fn(List(Int)) -> List(Int)) -> Nil {
  let assert True =
    f([73, 74, 75, 71, 69, 72, 76, 73]) == [1, 1, 4, 2, 1, 1, 0, 0]
  let assert True = f([30, 40, 50, 60]) == [1, 1, 1, 0]
  let assert True = f([30, 60, 90]) == [1, 1, 0]
  Nil
}

fn check_binary_search(f: fn(List(Int), Int) -> Result(Int, Nil)) -> Nil {
  let assert Ok(4) = f([-1, 0, 3, 5, 9, 12], 9)
  let assert Error(Nil) = f([-1, 0, 3, 5, 9, 12], 2)
  let assert Ok(0) = f([5], 5)
  let assert Error(Nil) = f([], 1)
  Nil
}

fn check_find_min_rotated(f: fn(List(Int)) -> Result(Int, Nil)) -> Nil {
  let assert Ok(1) = f([3, 4, 5, 1, 2])
  let assert Ok(0) = f([4, 5, 6, 7, 0, 1, 2])
  let assert Ok(11) = f([11, 13, 15, 17])
  let assert Ok(1) = f([2, 1])
  let assert Error(Nil) = f([])
  Nil
}

fn check_search_rotated(f: fn(List(Int), Int) -> Result(Int, Nil)) -> Nil {
  let assert Ok(4) = f([4, 5, 6, 7, 0, 1, 2], 0)
  let assert Error(Nil) = f([4, 5, 6, 7, 0, 1, 2], 3)
  let assert Ok(0) = f([1], 1)
  Nil
}

// --- Gleam Tips ------------------------------------------------------------

fn check_list_patterns(
  length: fn(List(Int)) -> Int,
  last: fn(List(Int)) -> Result(Int, Nil),
) -> Nil {
  let assert True = length([1, 2, 3]) == 3
  let assert True = length([]) == 0
  let assert Ok(3) = last([1, 2, 3])
  let assert Error(Nil) = last([])
  Nil
}

fn check_tail_recursion(
  reverse: fn(List(Int)) -> List(Int),
  sum: fn(List(Int)) -> Int,
) -> Nil {
  let assert True = reverse([1, 2, 3]) == [3, 2, 1]
  let assert True = reverse([]) == []
  let assert True = sum([1, 2, 3]) == 6
  Nil
}

fn check_fold(
  max: fn(List(Int)) -> Result(Int, Nil),
  count_if: fn(List(Int), fn(Int) -> Bool) -> Int,
  running_total: fn(List(Int)) -> List(Int),
) -> Nil {
  let assert Ok(3) = max([3, 1, 2])
  let assert Error(Nil) = max([])
  let assert True = count_if([1, 2, 3, 4], fn(n) { n % 2 == 0 }) == 2
  let assert True = running_total([1, 2, 3]) == [1, 3, 6]
  Nil
}

fn check_frequency_maps(f: fn(String) -> dict.Dict(String, Int)) -> Nil {
  let frequencies = f("the cat and the hat")
  let assert Ok(2) = dict.get(frequencies, "the")
  let assert Ok(1) = dict.get(frequencies, "cat")
  let assert Error(Nil) = dict.get(frequencies, "dog")
  Nil
}

fn check_result_chains(
  parse: fn(String, String, String) -> Result(c, Nil),
  fields: fn(c) -> #(String, Int, Int),
) -> Nil {
  let assert Ok(config) = parse("localhost", "8080", "30")
  let assert True = fields(config) == #("localhost", 8080, 30)
  let assert Error(Nil) = parse("localhost", "oops", "30")
  let assert Error(Nil) = parse("", "8080", "30")
  Nil
}

fn check_option(f: fn(dict.Dict(String, String)) -> String) -> Nil {
  let assert True =
    f(dict.from_list([#("port", "9000")])) == "port: 9000 (configured)"
  let assert True = f(dict.new()) == "port: 8080 (default)"
  Nil
}

fn check_string_patterns(
  strip_comment: fn(String) -> String,
  initials: fn(String) -> String,
) -> Nil {
  let assert True = strip_comment("# hello") == "hello"
  let assert True = strip_comment("code") == "code"
  let assert True = initials("ada lovelace") == "AL"
  Nil
}

fn check_pipelines(slug: fn(String) -> String) -> Nil {
  let assert True = slug("  Hello   Brave World ") == "hello-brave-world"
  Nil
}

fn check_records(
  new_player: fn(String) -> p,
  add_points: fn(p, Int) -> p,
  level_up: fn(p) -> p,
  fields: fn(p) -> #(String, Int, Int),
) -> Nil {
  let player =
    new_player("lucy")
    |> add_points(10)
  let assert True = fields(player) == #("lucy", 10, 1)
  let assert True = fields(level_up(player)) == #("lucy", 0, 2)
  Nil
}

fn check_dedupe(f: fn(List(Int)) -> List(Int)) -> Nil {
  let assert True = f([1, 2, 1, 3, 2]) == [1, 2, 3]
  let assert True = f([]) == []
  Nil
}
