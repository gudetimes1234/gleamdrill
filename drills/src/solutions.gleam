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
import nc25_min_window_substring
import nc25_min_window_substring__filtered_positions
import nc26_sliding_window_maximum
import nc26_sliding_window_maximum__brute_force
import nc27_eval_rpn
import nc27_eval_rpn__recursive
import nc28_generate_parentheses
import nc28_generate_parentheses__by_composition
import nc29_car_fleet
import nc29_car_fleet__pairwise
import nc30_largest_rectangle
import nc30_largest_rectangle__expand_from_each_bar
import nc31_search_2d_matrix
import nc31_search_2d_matrix__staircase
import nc32_koko_bananas
import nc32_koko_bananas__linear_scan
import nc33_time_map
import nc33_time_map__linear_scan
import nc34_median_two_sorted
import nc34_median_two_sorted__concat_sort
import nc35_insert_interval
import nc35_insert_interval__merge_after_append
import nc36_merge_intervals
import nc36_merge_intervals__sweep_counts
import nc37_non_overlapping
import nc37_non_overlapping__by_start
import nc38_meeting_rooms
import nc38_meeting_rooms__pairwise
import nc39_meeting_rooms_ii
import nc39_meeting_rooms_ii__count_at_each_start
import nc40_min_interval
import nc40_min_interval__offline_by_length
import nc41_maximum_subarray
import nc41_maximum_subarray__prefix_minimum
import nc42_jump_game
import nc42_jump_game__backwards
import nc43_jump_game_ii
import nc43_jump_game_ii__reverse_greedy
import nc44_gas_station
import nc44_gas_station__try_each_start
import nc45_hand_of_straights
import nc45_hand_of_straights__sorted_consume
import nc46_merge_triplets
import nc46_merge_triplets__track_positions
import nc47_partition_labels
import nc47_partition_labels__expand_end
import nc48_valid_parenthesis_string
import nc48_valid_parenthesis_string__two_passes
import nc49_single_number
import nc49_single_number__sum_of_uniques
import nc50_number_of_one_bits
import nc50_number_of_one_bits__shift_and_test
import nc51_counting_bits
import nc51_counting_bits__popcount_each
import nc52_reverse_bits
import nc52_reverse_bits__via_binary_string
import nc53_missing_number
import nc53_missing_number__gauss_sum
import nc54_sum_of_two_integers
import nc54_sum_of_two_integers__full_adder
import nc55_reverse_integer
import nc55_reverse_integer__via_string
import nc56_rotate_image
import nc56_rotate_image__by_index
import nc57_spiral_matrix
import nc57_spiral_matrix__boundaries
import nc58_set_matrix_zeroes
import nc58_set_matrix_zeroes__by_scanning
import nc59_happy_number
import nc59_happy_number__floyd_cycle
import nc60_plus_one
import nc60_plus_one__via_number
import nc61_pow
import nc61_pow__repeated_multiplication
import nc62_multiply_strings
import nc62_multiply_strings__partial_sums
import nc63_detect_squares
import nc63_detect_squares__by_side_length
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
    check_min_window(nc25_min_window_substring.min_window),
    check_min_window(nc25_min_window_substring__filtered_positions.min_window),
    check_sliding_window_maximum(nc26_sliding_window_maximum.max_sliding_window),
    check_sliding_window_maximum(
      nc26_sliding_window_maximum__brute_force.max_sliding_window,
    ),
    check_eval_rpn(nc27_eval_rpn.eval_rpn),
    check_eval_rpn(nc27_eval_rpn__recursive.eval_rpn),
    check_generate_parentheses(nc28_generate_parentheses.generate_parenthesis),
    check_generate_parentheses(
      nc28_generate_parentheses__by_composition.generate_parenthesis,
    ),
    check_car_fleet(nc29_car_fleet.car_fleet),
    check_car_fleet(nc29_car_fleet__pairwise.car_fleet),
    check_largest_rectangle(nc30_largest_rectangle.largest_rectangle_area),
    check_largest_rectangle(
      nc30_largest_rectangle__expand_from_each_bar.largest_rectangle_area,
    ),
    check_search_2d_matrix(nc31_search_2d_matrix.search_matrix),
    check_search_2d_matrix(nc31_search_2d_matrix__staircase.search_matrix),
    check_koko_bananas(nc32_koko_bananas.min_eating_speed),
    check_koko_bananas(nc32_koko_bananas__linear_scan.min_eating_speed),
    check_time_map(nc33_time_map.new, nc33_time_map.set, nc33_time_map.get),
    check_time_map(
      nc33_time_map__linear_scan.new,
      nc33_time_map__linear_scan.set,
      nc33_time_map__linear_scan.get,
    ),
    check_median_two_sorted(nc34_median_two_sorted.find_median_sorted_arrays),
    check_median_two_sorted(
      nc34_median_two_sorted__concat_sort.find_median_sorted_arrays,
    ),
    check_insert_interval(nc35_insert_interval.insert),
    check_insert_interval(nc35_insert_interval__merge_after_append.insert),
    check_merge_intervals(nc36_merge_intervals.merge),
    check_merge_intervals(nc36_merge_intervals__sweep_counts.merge),
    check_non_overlapping(nc37_non_overlapping.erase_overlap_intervals),
    check_non_overlapping(
      nc37_non_overlapping__by_start.erase_overlap_intervals,
    ),
    check_meeting_rooms(nc38_meeting_rooms.can_attend_meetings),
    check_meeting_rooms(nc38_meeting_rooms__pairwise.can_attend_meetings),
    check_meeting_rooms_ii(nc39_meeting_rooms_ii.min_meeting_rooms),
    check_meeting_rooms_ii(
      nc39_meeting_rooms_ii__count_at_each_start.min_meeting_rooms,
    ),
    check_min_interval(nc40_min_interval.min_interval),
    check_min_interval(nc40_min_interval__offline_by_length.min_interval),
    check_maximum_subarray(nc41_maximum_subarray.max_sub_array),
    check_maximum_subarray(nc41_maximum_subarray__prefix_minimum.max_sub_array),
    check_jump_game(nc42_jump_game.can_jump),
    check_jump_game(nc42_jump_game__backwards.can_jump),
    check_jump_game_ii(nc43_jump_game_ii.jump),
    check_jump_game_ii(nc43_jump_game_ii__reverse_greedy.jump),
    check_gas_station(nc44_gas_station.can_complete_circuit),
    check_gas_station(nc44_gas_station__try_each_start.can_complete_circuit),
    check_hand_of_straights(nc45_hand_of_straights.is_n_straight_hand),
    check_hand_of_straights(
      nc45_hand_of_straights__sorted_consume.is_n_straight_hand,
    ),
    check_merge_triplets(nc46_merge_triplets.merge_triplets),
    check_merge_triplets(nc46_merge_triplets__track_positions.merge_triplets),
    check_partition_labels(nc47_partition_labels.partition_labels),
    check_partition_labels(nc47_partition_labels__expand_end.partition_labels),
    check_valid_parenthesis_string(
      nc48_valid_parenthesis_string.check_valid_string,
    ),
    check_valid_parenthesis_string(
      nc48_valid_parenthesis_string__two_passes.check_valid_string,
    ),
    check_single_number(nc49_single_number.single_number),
    check_single_number(nc49_single_number__sum_of_uniques.single_number),
    check_hamming_weight(nc50_number_of_one_bits.hamming_weight),
    check_hamming_weight(nc50_number_of_one_bits__shift_and_test.hamming_weight),
    check_counting_bits(nc51_counting_bits.count_bits),
    check_counting_bits(nc51_counting_bits__popcount_each.count_bits),
    check_reverse_bits(nc52_reverse_bits.reverse_bits),
    check_reverse_bits(nc52_reverse_bits__via_binary_string.reverse_bits),
    check_missing_number(nc53_missing_number.missing_number),
    check_missing_number(nc53_missing_number__gauss_sum.missing_number),
    check_get_sum(nc54_sum_of_two_integers.get_sum),
    check_get_sum(nc54_sum_of_two_integers__full_adder.get_sum),
    check_reverse_integer(nc55_reverse_integer.reverse),
    check_reverse_integer(nc55_reverse_integer__via_string.reverse),
    check_rotate_image(nc56_rotate_image.rotate),
    check_rotate_image(nc56_rotate_image__by_index.rotate),
    check_spiral_matrix(nc57_spiral_matrix.spiral_order),
    check_spiral_matrix(nc57_spiral_matrix__boundaries.spiral_order),
    check_set_matrix_zeroes(nc58_set_matrix_zeroes.set_zeroes),
    check_set_matrix_zeroes(nc58_set_matrix_zeroes__by_scanning.set_zeroes),
    check_happy_number(nc59_happy_number.is_happy),
    check_happy_number(nc59_happy_number__floyd_cycle.is_happy),
    check_plus_one(nc60_plus_one.plus_one),
    check_plus_one(nc60_plus_one__via_number.plus_one),
    check_pow(nc61_pow.my_pow),
    check_pow(nc61_pow__repeated_multiplication.my_pow),
    check_multiply_strings(nc62_multiply_strings.multiply),
    check_multiply_strings(nc62_multiply_strings__partial_sums.multiply),
    check_detect_squares(
      nc63_detect_squares.new,
      nc63_detect_squares.add,
      nc63_detect_squares.count,
    ),
    check_detect_squares(
      nc63_detect_squares__by_side_length.new,
      nc63_detect_squares__by_side_length.add,
      nc63_detect_squares__by_side_length.count,
    ),

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

fn check_min_window(f: fn(String, String) -> String) -> Nil {
  let assert True = f("ADOBECODEBANC", "ABC") == "BANC"
  let assert True = f("a", "a") == "a"
  // The needle needs two copies and the haystack has one.
  let assert True = f("a", "aa") == ""
  let assert True = f("", "a") == ""
  let assert True = f("ab", "") == ""
  // Repeats in the needle: the window has to hold all three, not just one.
  let assert True = f("aaflslflsldkalskaaa", "aaa") == "aaa"
  Nil
}

fn check_sliding_window_maximum(f: fn(List(Int), Int) -> List(Int)) -> Nil {
  let assert True = f([1, 3, -1, -3, 5, 3, 6, 7], 3) == [3, 3, 5, 5, 6, 7]
  let assert True = f([1], 1) == [1]
  let assert True = f([], 3) == []
  let assert True = f([9, 8, 7, 6], 2) == [9, 8, 7]
  // All negative, k = 1: a running maximum seeded with zero fails here.
  let assert True = f([1, -1], 1) == [1, -1]
  let assert True = f([-7, -8, 7, 5, 7, 1, 6, 0], 4) == [7, 7, 7, 7, 7]
  Nil
}

fn check_eval_rpn(f: fn(List(String)) -> Int) -> Nil {
  let assert True = f(["2", "1", "+", "3", "*"]) == 9
  let assert True = f(["4", "13", "5", "/", "+"]) == 6
  // Division truncates towards zero, so this is -1 and not -2.
  let assert True = f(["-3", "2", "/"]) == -1
  let assert True = f(["5"]) == 5
  let assert True =
    f(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"])
    == 22
  Nil
}

fn check_generate_parentheses(f: fn(Int) -> List(String)) -> Nil {
  let sorted = fn(n) { list.sort(f(n), string.compare) }
  let assert True = sorted(1) == ["()"]
  let assert True = sorted(2) == ["(())", "()()"]
  let assert True =
    sorted(3) == ["((()))", "(()())", "(())()", "()(())", "()()()"]
  // The Catalan numbers: 14 is the count that catches a missed branch.
  let assert True = list.length(f(4)) == 14
  Nil
}

fn check_car_fleet(f: fn(Int, List(Int), List(Int)) -> Int) -> Nil {
  let assert True = f(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]) == 3
  let assert True = f(10, [3], [3]) == 1
  let assert True = f(100, [0, 2, 4], [4, 2, 1]) == 1
  let assert True = f(10, [6, 8], [3, 2]) == 2
  let assert True = f(10, [], []) == 0
  // Arrival times of 5, 6 and 8/3: a solution that rounds them loses this one.
  let assert True = f(10, [0, 4, 2], [2, 1, 3]) == 1
  Nil
}

fn check_largest_rectangle(f: fn(List(Int)) -> Int) -> Nil {
  let assert True = f([2, 1, 5, 6, 2, 3]) == 10
  let assert True = f([2, 4]) == 4
  let assert True = f([]) == 0
  let assert True = f([1, 1, 1]) == 3
  let assert True = f([5]) == 5
  // A zero splits the histogram in two; the best rectangle is on the right.
  let assert True = f([4, 2, 0, 3, 2, 5]) == 6
  Nil
}

fn check_search_2d_matrix(f: fn(List(List(Int)), Int) -> Bool) -> Nil {
  let matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]
  let assert True = f(matrix, 3)
  // Falls between two rows rather than inside one.
  let assert False = f(matrix, 13)
  let assert True = f(matrix, 60)
  let assert True = f([[1]], 1)
  let assert False = f([], 1)
  let assert True = f([[1], [3], [5]], 5)
  Nil
}

fn check_koko_bananas(f: fn(List(Int), Int) -> Int) -> Nil {
  let assert True = f([3, 6, 7, 11], 8) == 4
  // Exactly as many hours as piles, so she cannot split any pile across hours.
  let assert True = f([30, 11, 23, 4, 20], 5) == 30
  let assert True = f([30, 11, 23, 4, 20], 6) == 23
  let assert True = f([1], 1) == 1
  let assert True = f([4, 4, 4, 4], 4) == 4
  let assert True = f([1, 1, 1, 10], 4) == 10
  Nil
}

/// Generic over the store type, so both variants can carry their own.
fn check_time_map(
  new: fn() -> store,
  set: fn(store, String, String, Int) -> store,
  get: fn(store, String, Int) -> String,
) -> Nil {
  let store = set(new(), "foo", "bar", 1)
  let assert True = get(store, "foo", 1) == "bar"
  let assert True = get(store, "foo", 3) == "bar"

  let later = set(store, "foo", "bar2", 4)
  let assert True = get(later, "foo", 4) == "bar2"
  let assert True = get(later, "foo", 5) == "bar2"
  // A later write must not hide the value that was current earlier.
  let assert True = get(later, "foo", 3) == "bar"
  let assert True = get(later, "foo", 0) == ""
  let assert True = get(later, "missing", 1) == ""
  Nil
}

fn check_median_two_sorted(f: fn(List(Int), List(Int)) -> Float) -> Nil {
  let assert True = f([1, 3], [2]) == 2.0
  let assert True = f([1, 2], [3, 4]) == 2.5
  let assert True = f([], [1]) == 1.0
  let assert True = f([2], []) == 2.0
  let assert True = f([], []) == 0.0
  let assert True = f([1, 2], []) == 1.5
  let assert True = f([1, 3, 5, 7], [2, 4, 6]) == 4.0
  Nil
}

fn check_insert_interval(
  f: fn(List(#(Int, Int)), #(Int, Int)) -> List(#(Int, Int)),
) -> Nil {
  let assert True = f([#(1, 3), #(6, 9)], #(2, 5)) == [#(1, 5), #(6, 9)]
  let assert True =
    f([#(1, 2), #(3, 5), #(6, 7), #(8, 10), #(12, 16)], #(4, 8))
    == [#(1, 2), #(3, 10), #(12, 16)]
  let assert True = f([], #(5, 7)) == [#(5, 7)]
  // Swallowed whole by an existing interval, and sitting past the end.
  let assert True = f([#(1, 5)], #(2, 3)) == [#(1, 5)]
  let assert True = f([#(1, 5)], #(6, 8)) == [#(1, 5), #(6, 8)]
  let assert True = f([#(3, 5)], #(1, 2)) == [#(1, 2), #(3, 5)]
  Nil
}

fn check_merge_intervals(f: fn(List(#(Int, Int))) -> List(#(Int, Int))) -> Nil {
  let assert True =
    f([#(1, 3), #(2, 6), #(8, 10), #(15, 18)]) == [#(1, 6), #(8, 10), #(15, 18)]
  // Touching at a point counts as overlapping.
  let assert True = f([#(1, 4), #(4, 5)]) == [#(1, 5)]
  let assert True = f([]) == []
  let assert True = f([#(1, 4), #(0, 4)]) == [#(0, 4)]
  let assert True = f([#(1, 4), #(2, 3)]) == [#(1, 4)]
  Nil
}

fn check_non_overlapping(f: fn(List(#(Int, Int))) -> Int) -> Nil {
  let assert True = f([#(1, 2), #(2, 3), #(3, 4), #(1, 3)]) == 1
  let assert True = f([#(1, 2), #(1, 2), #(1, 2)]) == 2
  // Touching is not overlapping, so nothing has to go.
  let assert True = f([#(1, 2), #(2, 3)]) == 0
  let assert True = f([]) == 0
  // The greedy trap: keeping [1, 100] because it came first costs three.
  let assert True = f([#(1, 100), #(11, 22), #(1, 11), #(2, 12)]) == 2
  Nil
}

fn check_meeting_rooms(f: fn(List(#(Int, Int))) -> Bool) -> Nil {
  let assert False = f([#(0, 30), #(5, 10), #(15, 20)])
  // Out of order: sorting is part of the answer, not an assumption.
  let assert True = f([#(7, 10), #(2, 4)])
  let assert True = f([])
  let assert True = f([#(1, 5)])
  // Touching is not clashing: one ends exactly as the next begins.
  let assert True = f([#(1, 5), #(5, 10)])
  let assert False = f([#(5, 10), #(1, 6)])
  Nil
}

fn check_meeting_rooms_ii(f: fn(List(#(Int, Int))) -> Int) -> Nil {
  let assert True = f([#(0, 30), #(5, 10), #(15, 20)]) == 2
  let assert True = f([#(7, 10), #(2, 4)]) == 1
  let assert True = f([]) == 0
  // A room freed at the same moment can be reused, so this needs only one.
  let assert True = f([#(1, 5), #(5, 10)]) == 1
  let assert True =
    f([#(1, 10), #(2, 7), #(3, 19), #(8, 12), #(10, 20), #(11, 30)]) == 4
  Nil
}

fn check_min_interval(f: fn(List(#(Int, Int)), List(Int)) -> List(Int)) -> Nil {
  let assert True =
    f([#(1, 4), #(2, 4), #(3, 6), #(4, 4)], [2, 3, 4, 5]) == [3, 3, 1, 4]
  let assert True =
    f([#(2, 3), #(2, 5), #(1, 8), #(20, 25)], [2, 19, 5, 22]) == [2, -1, 4, 6]
  let assert True = f([], [1, 2]) == [-1, -1]
  let assert True = f([#(1, 10)], []) == []
  // Both queries fall outside, one either side.
  let assert True = f([#(1, 3)], [0, 4]) == [-1, -1]
  Nil
}

fn check_maximum_subarray(f: fn(List(Int)) -> Int) -> Nil {
  let assert True = f([-2, 1, -3, 4, -1, 2, 1, -5, 4]) == 6
  let assert True = f([1]) == 1
  let assert True = f([5, 4, -1, 7, 8]) == 23
  // All negative: the answer is the least bad single element, not zero.
  let assert True = f([-1]) == -1
  let assert True = f([-2, -1]) == -1
  let assert True = f([]) == 0
  Nil
}

fn check_jump_game(f: fn(List(Int)) -> Bool) -> Nil {
  let assert True = f([2, 3, 1, 1, 4])
  let assert False = f([3, 2, 1, 0, 4])
  // Already at the end, so a zero jump is fine.
  let assert True = f([0])
  let assert True = f([])
  let assert False = f([1, 0, 1, 0])
  let assert True = f([2, 0, 0])
  Nil
}

fn check_jump_game_ii(f: fn(List(Int)) -> Int) -> Nil {
  let assert True = f([2, 3, 1, 1, 4]) == 2
  let assert True = f([2, 3, 0, 1, 4]) == 2
  let assert True = f([0]) == 0
  let assert True = f([1]) == 0
  let assert True = f([1, 2, 3]) == 2
  let assert True = f([1, 1, 1, 1]) == 3
  Nil
}

fn check_gas_station(f: fn(List(Int), List(Int)) -> Int) -> Nil {
  let assert True = f([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]) == 3
  let assert True = f([2, 3, 4], [3, 4, 3]) == -1
  let assert True = f([5], [4]) == 0
  let assert True = f([1, 2], [2, 1]) == 1
  let assert True = f([], []) == -1
  // Starts at zero and only just survives: the tank hits exactly zero.
  let assert True = f([3, 1, 1], [1, 2, 2]) == 0
  Nil
}

fn check_hand_of_straights(f: fn(List(Int), Int) -> Bool) -> Nil {
  let assert True = f([1, 2, 3, 6, 2, 3, 4, 7, 8], 3)
  // Five cards cannot make groups of four whatever they are.
  let assert False = f([1, 2, 3, 4, 5], 4)
  let assert True = f([1, 2, 3, 4, 5, 6], 2)
  let assert True = f([], 1)
  // Duplicates: two identical runs, so every copy needs its own group.
  let assert True = f([1, 1, 2, 2, 3, 3], 3)
  let assert False = f([8, 10, 12], 3)
  Nil
}

fn check_merge_triplets(
  f: fn(List(#(Int, Int, Int)), #(Int, Int, Int)) -> Bool,
) -> Nil {
  let assert True = f([#(2, 5, 3), #(1, 8, 4), #(1, 7, 5)], #(2, 7, 5))
  let assert False = f([#(3, 4, 5), #(4, 5, 6)], #(3, 2, 5))
  let assert True =
    f([#(2, 5, 3), #(2, 3, 4), #(1, 2, 5), #(5, 2, 3)], #(5, 5, 5))
  let assert True = f([#(1, 1, 1)], #(1, 1, 1))
  let assert False = f([], #(1, 1, 1))
  // Every component is present somewhere, but not in the right position.
  let assert False = f([#(1, 2, 3)], #(3, 2, 1))
  Nil
}

fn check_partition_labels(f: fn(String) -> List(Int)) -> Nil {
  let assert True = f("ababcbacadefegdehijhklij") == [9, 7, 8]
  // One character reaches the far end, so the whole string is one piece.
  let assert True = f("eccbbbbdec") == [10]
  let assert True = f("a") == [1]
  let assert True = f("") == []
  let assert True = f("abc") == [1, 1, 1]
  Nil
}

fn check_valid_parenthesis_string(f: fn(String) -> Bool) -> Nil {
  let assert True = f("()")
  let assert True = f("(*)")
  let assert True = f("(*))")
  let assert False = f(")(")
  let assert True = f("")
  let assert True = f("*")
  // The closer comes first, so no reading of the star can rescue it.
  let assert False = f(")*")
  let assert True = f("(*()")
  Nil
}

fn check_single_number(f: fn(List(Int)) -> Int) -> Nil {
  let assert True = f([2, 2, 1]) == 1
  let assert True = f([4, 1, 2, 1, 2]) == 4
  let assert True = f([1]) == 1
  let assert True = f([-1, -1, -3]) == -3
  // Zero is the lone value, which a "sum of everything" shortcut would miss.
  let assert True = f([0, 1, 1]) == 0
  Nil
}

fn check_hamming_weight(f: fn(Int) -> Int) -> Nil {
  let assert True = f(11) == 3
  let assert True = f(128) == 1
  let assert True = f(0) == 0
  let assert True = f(2_147_483_645) == 30
  let assert True = f(1) == 1
  Nil
}

fn check_counting_bits(f: fn(Int) -> List(Int)) -> Nil {
  let assert True = f(5) == [0, 1, 1, 2, 1, 2]
  let assert True = f(2) == [0, 1, 1]
  let assert True = f(0) == [0]
  let assert True = f(8) == [0, 1, 1, 2, 1, 2, 2, 3, 1]
  Nil
}

fn check_reverse_bits(f: fn(Int) -> Int) -> Nil {
  let assert True = f(43_261_596) == 964_176_192
  // Above 2^31: the answer is unsigned, so a signed shift loses this one.
  let assert True = f(4_294_967_293) == 3_221_225_471
  let assert True = f(0) == 0
  // One bit at the bottom becomes one bit at the top, 31 places up.
  let assert True = f(1) == 2_147_483_648
  Nil
}

fn check_missing_number(f: fn(List(Int)) -> Int) -> Nil {
  let assert True = f([3, 0, 1]) == 2
  // The missing value is n itself, past the end of every index.
  let assert True = f([0, 1]) == 2
  let assert True = f([9, 6, 4, 2, 3, 5, 7, 0, 1]) == 8
  let assert True = f([0]) == 1
  let assert True = f([1]) == 0
  let assert True = f([]) == 0
  Nil
}

fn check_get_sum(f: fn(Int, Int) -> Int) -> Nil {
  let assert True = f(1, 2) == 3
  let assert True = f(2, 3) == 5
  // Mixed and negative signs are the whole difficulty: two's complement has to
  // survive the carry loop and be read back at the end.
  let assert True = f(-1, 1) == 0
  let assert True = f(-2, -3) == -5
  let assert True = f(0, 0) == 0
  let assert True = f(-1, -1) == -2
  let assert True = f(5, -3) == 2
  Nil
}

fn check_reverse_integer(f: fn(Int) -> Int) -> Nil {
  let assert True = f(123) == 321
  let assert True = f(-123) == -321
  // Trailing zeros disappear rather than becoming leading ones.
  let assert True = f(120) == 21
  let assert True = f(0) == 0
  // Reverses past the 32-bit maximum, so the answer is zero.
  let assert True = f(1_534_236_469) == 0
  let assert True = f(-2_147_483_648) == 0
  // Reverses to exactly six below the maximum: the nearest legal case.
  let assert True = f(1_463_847_412) == 2_147_483_641
  Nil
}

fn check_rotate_image(f: fn(List(List(Int))) -> List(List(Int))) -> Nil {
  let assert True =
    f([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) == [[7, 4, 1], [8, 5, 2], [9, 6, 3]]
  let assert True = f([[1, 2], [3, 4]]) == [[3, 1], [4, 2]]
  let assert True = f([[1]]) == [[1]]
  let assert True = f([]) == []
  // Even size, so nothing sits still: a wrong direction shows up immediately.
  let assert True =
    f([[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]])
    == [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]]
  Nil
}

fn check_spiral_matrix(f: fn(List(List(Int))) -> List(Int)) -> Nil {
  let assert True =
    f([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) == [1, 2, 3, 6, 9, 8, 7, 4, 5]
  let assert True =
    f([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])
    == [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
  let assert True = f([[1]]) == [1]
  let assert True = f([]) == []
  // A single row and a single column: the cases where a boundary walk emits
  // the same cells twice if it forgets to check.
  let assert True = f([[1, 2, 3]]) == [1, 2, 3]
  let assert True = f([[1], [2], [3]]) == [1, 2, 3]
  Nil
}

fn check_set_matrix_zeroes(f: fn(List(List(Int))) -> List(List(Int))) -> Nil {
  let assert True =
    f([[1, 1, 1], [1, 0, 1], [1, 1, 1]]) == [[1, 0, 1], [0, 0, 0], [1, 0, 1]]
  // Zeros in the first row and first column, which is what breaks a solution
  // that uses them as its own scratch space without reading them first.
  let assert True =
    f([[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]])
    == [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]]
  let assert True = f([[1]]) == [[1]]
  let assert True = f([[0]]) == [[0]]
  let assert True = f([]) == []
  let assert True = f([[1, 2], [3, 4]]) == [[1, 2], [3, 4]]
  Nil
}

fn check_happy_number(f: fn(Int) -> Bool) -> Nil {
  let assert True = f(19)
  let assert False = f(2)
  let assert True = f(1)
  let assert True = f(7)
  // 4 is on the one cycle every unhappy number falls into.
  let assert False = f(4)
  let assert True = f(100)
  Nil
}

fn check_plus_one(f: fn(List(Int)) -> List(Int)) -> Nil {
  let assert True = f([1, 2, 3]) == [1, 2, 4]
  let assert True = f([4, 3, 2, 1]) == [4, 3, 2, 2]
  // All nines: the carry runs off the end and the number grows a digit.
  let assert True = f([9]) == [1, 0]
  let assert True = f([9, 9]) == [1, 0, 0]
  let assert True = f([0]) == [1]
  let assert True = f([1, 9, 9]) == [2, 0, 0]
  Nil
}

fn check_pow(f: fn(Float, Int) -> Float) -> Nil {
  let assert True = f(2.0, 10) == 1024.0
  // Negative exponent, and zero, which the halving recursion bottoms out on.
  let assert True = f(2.0, -2) == 0.25
  let assert True = f(2.0, 0) == 1.0
  let assert True = f(0.5, 3) == 0.125
  let assert True = f(-2.0, 3) == -8.0
  let assert True = f(2.0, 1) == 2.0
  let assert True = f(0.0, 5) == 0.0
  Nil
}

fn check_multiply_strings(f: fn(String, String) -> String) -> Nil {
  let assert True = f("2", "3") == "6"
  let assert True = f("123", "456") == "56088"
  // Zero has to come back as "0" and not as a string of zeros.
  let assert True = f("0", "52") == "0"
  let assert True = f("9", "9") == "81"
  let assert True = f("999", "999") == "998001"
  // Longer than a 64-bit integer, which is the reason the input is a string.
  let assert True = f("123456789", "987654321") == "121932631112635269"
  Nil
}

/// Generic over the store type, so both variants can carry their own.
fn check_detect_squares(
  new: fn() -> store,
  add: fn(store, #(Int, Int)) -> store,
  count: fn(store, #(Int, Int)) -> Int,
) -> Nil {
  let store =
    new()
    |> add(#(3, 10))
    |> add(#(11, 2))
    |> add(#(3, 2))

  let assert True = count(store, #(11, 10)) == 1
  let assert True = count(store, #(14, 8)) == 0

  // A repeated point counts as a separate corner, so the same square is found
  // twice \u{2014} which is why the counts multiply rather than being a set.
  let doubled = add(store, #(11, 2))
  let assert True = count(doubled, #(11, 10)) == 2

  let assert True = count(new(), #(0, 0)) == 0
  let assert True =
    new()
    |> add(#(0, 1))
    |> add(#(1, 0))
    |> add(#(1, 1))
    |> count(#(0, 0))
    == 1
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
