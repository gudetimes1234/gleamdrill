import gleam/dict
import gleam/int
import gleam/io
import gleam/list
import nc01_contains_duplicate
import nc02_valid_anagram
import nc03_two_sum
import nc04_group_anagrams
import nc05_top_k_frequent
import nc06_product_except_self
import nc07_longest_consecutive
import nc08_valid_palindrome
import nc09_two_sum_sorted
import nc10_three_sum
import nc11_container_water
import nc12_best_time_stock
import nc13_longest_substring
import nc14_character_replacement
import nc15_permutation_in_string
import nc16_valid_parentheses
import nc17_min_stack
import nc18_daily_temperatures
import nc19_binary_search
import nc20_find_min_rotated
import nc21_search_rotated
import tip01_list_patterns
import tip02_tail_recursion
import tip03_fold
import tip04_frequency_maps
import tip05_result_chains
import tip06_option
import tip07_string_patterns
import tip08_pipelines
import tip09_records
import tip10_set_dedupe

pub fn main() {
  let assert True = nc01_contains_duplicate.contains_duplicate([1, 2, 3, 1])
  let assert False = nc01_contains_duplicate.contains_duplicate([1, 2, 3, 4])

  let assert True = nc02_valid_anagram.is_anagram("anagram", "nagaram")
  let assert False = nc02_valid_anagram.is_anagram("rat", "car")

  let assert Ok(#(0, 1)) = nc03_two_sum.two_sum([2, 7, 11, 15], 9)
  let assert Ok(#(1, 2)) = nc03_two_sum.two_sum([3, 2, 4], 6)
  let assert Error(Nil) = nc03_two_sum.two_sum([1, 2], 7)

  let groups =
    nc04_group_anagrams.group_anagrams([
      "eat",
      "tea",
      "tan",
      "ate",
      "nat",
      "bat",
    ])
  let assert True =
    list.sort(list.map(groups, list.length), int.compare) == [1, 2, 3]

  let assert True =
    nc05_top_k_frequent.top_k_frequent([1, 1, 1, 2, 2, 3], 2) == [1, 2]

  let assert True =
    nc06_product_except_self.product_except_self([1, 2, 3, 4]) == [24, 12, 8, 6]

  let assert True =
    nc07_longest_consecutive.longest_consecutive([100, 4, 200, 1, 3, 2]) == 4

  let assert True =
    nc08_valid_palindrome.is_palindrome("A man, a plan, a canal: Panama")
  let assert False = nc08_valid_palindrome.is_palindrome("race a car")

  let assert Ok(#(1, 2)) = nc09_two_sum_sorted.two_sum_sorted([2, 7, 11, 15], 9)
  let assert Error(Nil) = nc09_two_sum_sorted.two_sum_sorted([1, 2, 3], 100)

  let triples = nc10_three_sum.three_sum([-1, 0, 1, 2, -1, -4])
  let assert True = list.length(triples) == 2
  let assert True = list.contains(triples, #(-1, -1, 2))
  let assert True = list.contains(triples, #(-1, 0, 1))
  let assert True = nc10_three_sum.three_sum([0, 1, 1]) == []

  let assert True =
    nc11_container_water.max_area([1, 8, 6, 2, 5, 4, 8, 3, 7]) == 49

  let assert True = nc12_best_time_stock.max_profit([7, 1, 5, 3, 6, 4]) == 5
  let assert True = nc12_best_time_stock.max_profit([7, 6, 4, 3, 1]) == 0

  let assert True =
    nc13_longest_substring.length_of_longest_substring("abcabcbb") == 3
  let assert True =
    nc13_longest_substring.length_of_longest_substring("bbbbb") == 1
  let assert True =
    nc13_longest_substring.length_of_longest_substring("pwwkew") == 3

  let assert True =
    nc14_character_replacement.character_replacement("ABAB", 2) == 4
  let assert True =
    nc14_character_replacement.character_replacement("AABABBA", 1) == 4

  let assert True = nc15_permutation_in_string.check_inclusion("ab", "eidbaooo")
  let assert False =
    nc15_permutation_in_string.check_inclusion("ab", "eidboaoo")

  let assert True = nc16_valid_parentheses.is_valid("()[]{}")
  let assert False = nc16_valid_parentheses.is_valid("(]")
  let assert False = nc16_valid_parentheses.is_valid("([)]")
  let assert True = nc16_valid_parentheses.is_valid("{[]}")

  let stack =
    nc17_min_stack.new()
    |> nc17_min_stack.push(-2)
    |> nc17_min_stack.push(0)
    |> nc17_min_stack.push(-3)
  let assert Ok(-3) = nc17_min_stack.get_min(stack)
  let stack = nc17_min_stack.pop(stack)
  let assert Ok(0) = nc17_min_stack.top(stack)
  let assert Ok(-2) = nc17_min_stack.get_min(stack)

  let assert True =
    nc18_daily_temperatures.daily_temperatures([73, 74, 75, 71, 69, 72, 76, 73])
    == [1, 1, 4, 2, 1, 1, 0, 0]

  let assert Ok(4) = nc19_binary_search.search([-1, 0, 3, 5, 9, 12], 9)
  let assert Error(Nil) = nc19_binary_search.search([-1, 0, 3, 5, 9, 12], 2)

  let assert Ok(1) = nc20_find_min_rotated.find_min([3, 4, 5, 1, 2])
  let assert Ok(0) = nc20_find_min_rotated.find_min([4, 5, 6, 7, 0, 1, 2])
  let assert Ok(11) = nc20_find_min_rotated.find_min([11, 13, 15, 17])
  let assert Ok(1) = nc20_find_min_rotated.find_min([2, 1])

  let assert Ok(4) =
    nc21_search_rotated.search_rotated([4, 5, 6, 7, 0, 1, 2], 0)
  let assert Error(Nil) =
    nc21_search_rotated.search_rotated([4, 5, 6, 7, 0, 1, 2], 3)
  let assert Ok(0) = nc21_search_rotated.search_rotated([1], 1)

  let assert True = tip01_list_patterns.length([1, 2, 3]) == 3
  let assert Ok(3) = tip01_list_patterns.last([1, 2, 3])
  let assert Error(Nil) = tip01_list_patterns.last([])

  let assert True = tip02_tail_recursion.reverse([1, 2, 3]) == [3, 2, 1]
  let assert True = tip02_tail_recursion.sum([1, 2, 3]) == 6

  let assert Ok(3) = tip03_fold.max([3, 1, 2])
  let assert True = tip03_fold.count_if([1, 2, 3, 4], fn(n) { n % 2 == 0 }) == 2
  let assert True = tip03_fold.running_total([1, 2, 3]) == [1, 3, 6]

  let frequencies = tip04_frequency_maps.word_frequencies("the cat and the hat")
  let assert Ok(2) = dict.get(frequencies, "the")
  let assert Ok(1) = dict.get(frequencies, "cat")

  let assert Ok(tip05_result_chains.Config("localhost", 8080, 30)) =
    tip05_result_chains.parse_config("localhost", "8080", "30")
  let assert Error(Nil) =
    tip05_result_chains.parse_config("localhost", "oops", "30")
  let assert Error(Nil) = tip05_result_chains.parse_config("", "8080", "30")

  let assert True =
    tip06_option.port_description(dict.from_list([#("port", "9000")]))
    == "port: 9000 (configured)"
  let assert True =
    tip06_option.port_description(dict.new()) == "port: 8080 (default)"

  let assert True = tip07_string_patterns.strip_comment("# hello") == "hello"
  let assert True = tip07_string_patterns.strip_comment("code") == "code"
  let assert True = tip07_string_patterns.initials("ada lovelace") == "AL"

  let assert True =
    tip08_pipelines.slug("  Hello   Brave World ") == "hello-brave-world"

  let player =
    tip09_records.new_player("lucy")
    |> tip09_records.add_points(10)
  let assert True = player.score == 10
  let leveled = tip09_records.level_up(player)
  let assert True = leveled.level == 2 && leveled.score == 0

  let assert True = tip10_set_dedupe.dedupe([1, 2, 1, 3, 2]) == [1, 2, 3]

  io.println("all solution checks passed")
}
