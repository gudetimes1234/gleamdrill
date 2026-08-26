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
import gleam/order
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
import nc100_edit_distance
import nc100_edit_distance__memoised
import nc101_burst_balloons
import nc101_burst_balloons__bottom_up
import nc102_regular_expression_matching
import nc102_regular_expression_matching__no_cache
import nc103_implement_trie
import nc103_implement_trie__prefix_set
import nc104_word_dictionary
import nc104_word_dictionary__by_length
import nc105_word_search_ii
import nc105_word_search_ii__each_word
import nc106_number_of_islands
import nc106_number_of_islands__union_find
import nc107_clone_graph
import nc107_clone_graph__depth_first
import nc108_max_area_of_island
import nc108_max_area_of_island__breadth_first
import nc109_pacific_atlantic
import nc109_pacific_atlantic__from_each_cell
import nc10_three_sum
import nc10_three_sum__brute_force
import nc110_surrounded_regions
import nc110_surrounded_regions__per_region
import nc111_rotting_oranges
import nc111_rotting_oranges__simulate_minutes
import nc112_walls_and_gates
import nc112_walls_and_gates__from_each_room
import nc113_course_schedule
import nc113_course_schedule__dfs_colours
import nc114_course_schedule_ii
import nc114_course_schedule_ii__dfs_postorder
import nc115_redundant_connection
import nc115_redundant_connection__by_removal
import nc116_connected_components
import nc116_connected_components__by_traversal
import nc117_graph_valid_tree
import nc117_graph_valid_tree__union_find
import nc118_word_ladder
import nc118_word_ladder__compare_pairs
import nc119_reconstruct_itinerary
import nc119_reconstruct_itinerary__backtracking
import nc11_container_water
import nc11_container_water__brute_force
import nc120_min_cost_connect_points
import nc120_min_cost_connect_points__kruskal
import nc121_network_delay_time
import nc121_network_delay_time__bellman_ford
import nc122_swim_in_water
import nc122_swim_in_water__binary_search
import nc123_alien_dictionary
import nc123_alien_dictionary__dfs_postorder
import nc124_cheapest_flights
import nc124_cheapest_flights__breadth_first
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
import nc64_climbing_stairs
import nc64_climbing_stairs__memoised
import nc65_min_cost_climbing_stairs
import nc65_min_cost_climbing_stairs__from_the_top
import nc66_house_robber
import nc66_house_robber__memoised
import nc67_house_robber_ii
import nc67_house_robber_ii__both_at_once
import nc68_longest_palindrome
import nc68_longest_palindrome__brute_force
import nc69_palindromic_substrings
import nc69_palindromic_substrings__dp_table
import nc70_decode_ways
import nc70_decode_ways__memoised
import nc71_coin_change
import nc71_coin_change__breadth_first
import nc72_maximum_product_subarray
import nc72_maximum_product_subarray__prefix_and_suffix
import nc73_word_break
import nc73_word_break__memoised
import nc74_longest_increasing_subsequence
import nc74_longest_increasing_subsequence__patience
import nc75_partition_equal_subset
import nc75_partition_equal_subset__memoised
import nc76_kth_largest_stream
import nc76_kth_largest_stream__keep_everything
import nc77_last_stone_weight
import nc77_last_stone_weight__find_max_each_round
import nc78_k_closest_points
import nc78_k_closest_points__select_k_times
import nc79_kth_largest_array
import nc79_kth_largest_array__quickselect
import nc80_task_scheduler
import nc80_task_scheduler__simulate
import nc81_design_twitter
import nc81_design_twitter__merge_per_user
import nc82_find_median_stream
import nc82_find_median_stream__sorted_list
import nc83_subsets
import nc83_subsets__bitmask
import nc84_combination_sum
import nc84_combination_sum__by_target
import nc85_permutations
import nc85_permutations__insert_everywhere
import nc86_subsets_ii
import nc86_subsets_ii__by_counts
import nc87_combination_sum_ii
import nc87_combination_sum_ii__dedupe_at_the_end
import nc88_word_search
import nc88_word_search__prune_by_counts
import nc89_palindrome_partitioning
import nc89_palindrome_partitioning__with_table
import nc90_letter_combinations
import nc90_letter_combinations__iterative_product
import nc91_n_queens
import nc91_n_queens__filter_permutations
import nc92_unique_paths
import nc92_unique_paths__pascal
import nc93_longest_common_subsequence
import nc93_longest_common_subsequence__memoised
import nc94_coin_change_ii
import nc94_coin_change_ii__by_coin_recursion
import nc95_target_sum
import nc95_target_sum__as_subset_sum
import nc96_stock_with_cooldown
import nc96_stock_with_cooldown__memoised
import nc97_interleaving_string
import nc97_interleaving_string__rolling_row
import nc98_longest_increasing_path
import nc98_longest_increasing_path__by_value_order
import nc99_distinct_subsequences
import nc99_distinct_subsequences__memoised
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
    check_climbing_stairs(nc64_climbing_stairs.climb_stairs),
    check_climbing_stairs(nc64_climbing_stairs__memoised.climb_stairs),
    check_min_cost_climbing(
      nc65_min_cost_climbing_stairs.min_cost_climbing_stairs,
    ),
    check_min_cost_climbing(
      nc65_min_cost_climbing_stairs__from_the_top.min_cost_climbing_stairs,
    ),
    check_house_robber(nc66_house_robber.rob),
    check_house_robber(nc66_house_robber__memoised.rob),
    check_house_robber_ii(nc67_house_robber_ii.rob),
    check_house_robber_ii(nc67_house_robber_ii__both_at_once.rob),
    check_longest_palindrome(nc68_longest_palindrome.longest_palindrome),
    check_longest_palindrome(
      nc68_longest_palindrome__brute_force.longest_palindrome,
    ),
    check_palindromic_substrings(nc69_palindromic_substrings.count_substrings),
    check_palindromic_substrings(
      nc69_palindromic_substrings__dp_table.count_substrings,
    ),
    check_decode_ways(nc70_decode_ways.num_decodings),
    check_decode_ways(nc70_decode_ways__memoised.num_decodings),
    check_coin_change(nc71_coin_change.coin_change),
    check_coin_change(nc71_coin_change__breadth_first.coin_change),
    check_maximum_product(nc72_maximum_product_subarray.max_product),
    check_maximum_product(
      nc72_maximum_product_subarray__prefix_and_suffix.max_product,
    ),
    check_word_break(nc73_word_break.word_break),
    check_word_break(nc73_word_break__memoised.word_break),
    check_lis(nc74_longest_increasing_subsequence.length_of_lis),
    check_lis(nc74_longest_increasing_subsequence__patience.length_of_lis),
    check_partition_equal(nc75_partition_equal_subset.can_partition),
    check_partition_equal(nc75_partition_equal_subset__memoised.can_partition),
    check_kth_largest_stream(
      nc76_kth_largest_stream.new,
      nc76_kth_largest_stream.add,
      nc76_kth_largest_stream.kth,
    ),
    check_kth_largest_stream(
      nc76_kth_largest_stream__keep_everything.new,
      nc76_kth_largest_stream__keep_everything.add,
      nc76_kth_largest_stream__keep_everything.kth,
    ),
    check_last_stone_weight(nc77_last_stone_weight.last_stone_weight),
    check_last_stone_weight(
      nc77_last_stone_weight__find_max_each_round.last_stone_weight,
    ),
    check_k_closest(nc78_k_closest_points.k_closest),
    check_k_closest(nc78_k_closest_points__select_k_times.k_closest),
    check_kth_largest_array(nc79_kth_largest_array.find_kth_largest),
    check_kth_largest_array(
      nc79_kth_largest_array__quickselect.find_kth_largest,
    ),
    check_task_scheduler(nc80_task_scheduler.least_interval),
    check_task_scheduler(nc80_task_scheduler__simulate.least_interval),
    check_twitter(
      nc81_design_twitter.new,
      nc81_design_twitter.post_tweet,
      nc81_design_twitter.follow,
      nc81_design_twitter.unfollow,
      nc81_design_twitter.news_feed,
    ),
    check_twitter(
      nc81_design_twitter__merge_per_user.new,
      nc81_design_twitter__merge_per_user.post_tweet,
      nc81_design_twitter__merge_per_user.follow,
      nc81_design_twitter__merge_per_user.unfollow,
      nc81_design_twitter__merge_per_user.news_feed,
    ),
    check_median_finder(
      nc82_find_median_stream.new,
      nc82_find_median_stream.add_num,
      nc82_find_median_stream.find_median,
    ),
    check_median_finder(
      nc82_find_median_stream__sorted_list.new,
      nc82_find_median_stream__sorted_list.add_num,
      nc82_find_median_stream__sorted_list.find_median,
    ),
    check_subsets(nc83_subsets.subsets),
    check_subsets(nc83_subsets__bitmask.subsets),
    check_combination_sum(nc84_combination_sum.combination_sum),
    check_combination_sum(nc84_combination_sum__by_target.combination_sum),
    check_permutations(nc85_permutations.permute),
    check_permutations(nc85_permutations__insert_everywhere.permute),
    check_subsets_ii(nc86_subsets_ii.subsets_with_dup),
    check_subsets_ii(nc86_subsets_ii__by_counts.subsets_with_dup),
    check_combination_sum_ii(nc87_combination_sum_ii.combination_sum2),
    check_combination_sum_ii(
      nc87_combination_sum_ii__dedupe_at_the_end.combination_sum2,
    ),
    check_word_search(nc88_word_search.exist),
    check_word_search(nc88_word_search__prune_by_counts.exist),
    check_palindrome_partitioning(nc89_palindrome_partitioning.partition),
    check_palindrome_partitioning(
      nc89_palindrome_partitioning__with_table.partition,
    ),
    check_letter_combinations(nc90_letter_combinations.letter_combinations),
    check_letter_combinations(
      nc90_letter_combinations__iterative_product.letter_combinations,
    ),
    check_n_queens(nc91_n_queens.solve_n_queens),
    check_n_queens(nc91_n_queens__filter_permutations.solve_n_queens),
    check_unique_paths(nc92_unique_paths.unique_paths),
    check_unique_paths(nc92_unique_paths__pascal.unique_paths),
    check_lcs_strings(
      nc93_longest_common_subsequence.longest_common_subsequence,
    ),
    check_lcs_strings(
      nc93_longest_common_subsequence__memoised.longest_common_subsequence,
    ),
    check_coin_change_ii(nc94_coin_change_ii.change),
    check_coin_change_ii(nc94_coin_change_ii__by_coin_recursion.change),
    check_target_sum(nc95_target_sum.find_target_sum_ways),
    check_target_sum(nc95_target_sum__as_subset_sum.find_target_sum_ways),
    check_stock_cooldown(nc96_stock_with_cooldown.max_profit),
    check_stock_cooldown(nc96_stock_with_cooldown__memoised.max_profit),
    check_interleaving(nc97_interleaving_string.is_interleave),
    check_interleaving(nc97_interleaving_string__rolling_row.is_interleave),
    check_longest_increasing_path(
      nc98_longest_increasing_path.longest_increasing_path,
    ),
    check_longest_increasing_path(
      nc98_longest_increasing_path__by_value_order.longest_increasing_path,
    ),
    check_distinct_subsequences(nc99_distinct_subsequences.num_distinct),
    check_distinct_subsequences(
      nc99_distinct_subsequences__memoised.num_distinct,
    ),
    check_edit_distance(nc100_edit_distance.min_distance),
    check_edit_distance(nc100_edit_distance__memoised.min_distance),
    check_burst_balloons(nc101_burst_balloons.max_coins),
    check_burst_balloons(nc101_burst_balloons__bottom_up.max_coins),
    check_regex_matching(nc102_regular_expression_matching.is_match),
    check_regex_matching(nc102_regular_expression_matching__no_cache.is_match),
    check_trie(
      nc103_implement_trie.new,
      nc103_implement_trie.insert,
      nc103_implement_trie.search,
      nc103_implement_trie.starts_with,
    ),
    check_trie(
      nc103_implement_trie__prefix_set.new,
      nc103_implement_trie__prefix_set.insert,
      nc103_implement_trie__prefix_set.search,
      nc103_implement_trie__prefix_set.starts_with,
    ),
    check_word_dictionary(
      nc104_word_dictionary.new,
      nc104_word_dictionary.add_word,
      nc104_word_dictionary.search,
    ),
    check_word_dictionary(
      nc104_word_dictionary__by_length.new,
      nc104_word_dictionary__by_length.add_word,
      nc104_word_dictionary__by_length.search,
    ),
    check_word_search_ii(nc105_word_search_ii.find_words),
    check_word_search_ii(nc105_word_search_ii__each_word.find_words),
    check_number_of_islands(nc106_number_of_islands.num_islands),
    check_number_of_islands(nc106_number_of_islands__union_find.num_islands),
    check_clone_graph(nc107_clone_graph.clone_graph),
    check_clone_graph(nc107_clone_graph__depth_first.clone_graph),
    check_max_area_of_island(nc108_max_area_of_island.max_area_of_island),
    check_max_area_of_island(
      nc108_max_area_of_island__breadth_first.max_area_of_island,
    ),
    check_pacific_atlantic(nc109_pacific_atlantic.pacific_atlantic),
    check_pacific_atlantic(
      nc109_pacific_atlantic__from_each_cell.pacific_atlantic,
    ),
    check_surrounded_regions(nc110_surrounded_regions.solve),
    check_surrounded_regions(nc110_surrounded_regions__per_region.solve),
    check_rotting_oranges(nc111_rotting_oranges.oranges_rotting),
    check_rotting_oranges(
      nc111_rotting_oranges__simulate_minutes.oranges_rotting,
    ),
    check_walls_and_gates(nc112_walls_and_gates.walls_and_gates),
    check_walls_and_gates(nc112_walls_and_gates__from_each_room.walls_and_gates),
    check_course_schedule(nc113_course_schedule.can_finish),
    check_course_schedule(nc113_course_schedule__dfs_colours.can_finish),
    check_course_schedule_ii(nc114_course_schedule_ii.find_order),
    check_course_schedule_ii(nc114_course_schedule_ii__dfs_postorder.find_order),
    check_redundant_connection(
      nc115_redundant_connection.find_redundant_connection,
    ),
    check_redundant_connection(
      nc115_redundant_connection__by_removal.find_redundant_connection,
    ),
    check_connected_components(nc116_connected_components.count_components),
    check_connected_components(
      nc116_connected_components__by_traversal.count_components,
    ),
    check_graph_valid_tree(nc117_graph_valid_tree.valid_tree),
    check_graph_valid_tree(nc117_graph_valid_tree__union_find.valid_tree),
    check_word_ladder(nc118_word_ladder.ladder_length),
    check_word_ladder(nc118_word_ladder__compare_pairs.ladder_length),
    check_reconstruct_itinerary(nc119_reconstruct_itinerary.find_itinerary),
    check_reconstruct_itinerary(
      nc119_reconstruct_itinerary__backtracking.find_itinerary,
    ),
    check_min_cost_connect_points(
      nc120_min_cost_connect_points.min_cost_connect_points,
    ),
    check_min_cost_connect_points(
      nc120_min_cost_connect_points__kruskal.min_cost_connect_points,
    ),
    check_network_delay_time(nc121_network_delay_time.network_delay_time),
    check_network_delay_time(
      nc121_network_delay_time__bellman_ford.network_delay_time,
    ),
    check_swim_in_water(nc122_swim_in_water.swim_in_water),
    check_swim_in_water(nc122_swim_in_water__binary_search.swim_in_water),
    check_alien_order(nc123_alien_dictionary.alien_order),
    check_alien_order(nc123_alien_dictionary__dfs_postorder.alien_order),
    check_cheapest_flights(nc124_cheapest_flights.find_cheapest_price),
    check_cheapest_flights(
      nc124_cheapest_flights__breadth_first.find_cheapest_price,
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

fn check_climbing_stairs(f: fn(Int) -> Int) -> Nil {
  let assert True = f(2) == 2
  let assert True = f(3) == 3
  let assert True = f(1) == 1
  // Zero steps is one way \u{2014} stand still \u{2014} which is what makes the base case
  // of the recurrence work out.
  let assert True = f(0) == 1
  let assert True = f(10) == 89
  // Large enough that an unmemoised recursion would take longer than a life.
  let assert True = f(45) == 1_836_311_903
  Nil
}

fn check_min_cost_climbing(f: fn(List(Int)) -> Int) -> Nil {
  let assert True = f([10, 15, 20]) == 15
  let assert True = f([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]) == 6
  let assert True = f([0, 0]) == 0
  // Either step may be the starting point, so the cheaper of the first two is
  // free.
  let assert True = f([1, 2]) == 1
  let assert True = f([0, 1, 1, 0]) == 1
  let assert True = f([]) == 0
  Nil
}

fn check_house_robber(f: fn(List(Int)) -> Int) -> Nil {
  let assert True = f([1, 2, 3, 1]) == 4
  let assert True = f([2, 7, 9, 3, 1]) == 12
  let assert True = f([5]) == 5
  let assert True = f([]) == 0
  // Taking both ends beats taking the middle, which a greedy pass gets wrong.
  let assert True = f([2, 1, 1, 2]) == 4
  let assert True = f([1, 2]) == 2
  Nil
}

fn check_house_robber_ii(f: fn(List(Int)) -> Int) -> Nil {
  // First and last are neighbours, so 2 + 2 is not available.
  let assert True = f([2, 3, 2]) == 3
  let assert True = f([1, 2, 3, 1]) == 4
  let assert True = f([1, 2, 3]) == 3
  let assert True = f([1]) == 1
  let assert True = f([]) == 0
  let assert True = f([1, 2]) == 2
  Nil
}

/// Only inputs with a single longest palindrome, since the problem allows any
/// of them and the two variants would otherwise disagree legitimately.
fn check_longest_palindrome(f: fn(String) -> String) -> Nil {
  let assert True = f("cbbd") == "bb"
  let assert True = f("a") == "a"
  let assert True = f("") == ""
  let assert True = f("forgeeksskeegfor") == "geeksskeeg"
  // Even and odd centres: "aaaa" needs a gap centre, "racecar" a character one.
  let assert True = f("aaaa") == "aaaa"
  let assert True = f("racecar") == "racecar"
  let assert True = f("abb") == "bb"
  Nil
}

fn check_palindromic_substrings(f: fn(String) -> Int) -> Nil {
  let assert True = f("abc") == 3
  let assert True = f("aaa") == 6
  let assert True = f("") == 0
  let assert True = f("a") == 1
  let assert True = f("aba") == 4
  let assert True = f("abccba") == 9
  Nil
}

fn check_decode_ways(f: fn(String) -> Int) -> Nil {
  let assert True = f("12") == 2
  let assert True = f("226") == 3
  // A zero can never stand alone, and only 10 and 20 can carry one.
  let assert True = f("06") == 0
  let assert True = f("0") == 0
  let assert True = f("") == 0
  let assert True = f("10") == 1
  let assert True = f("2101") == 1
  let assert True = f("11106") == 2
  Nil
}

fn check_coin_change(f: fn(List(Int), Int) -> Int) -> Nil {
  let assert True = f([1, 2, 5], 11) == 3
  let assert True = f([2], 3) == -1
  let assert True = f([1], 0) == 0
  let assert True = f([], 5) == -1
  // Greedy takes 4 + 1 + 1; the answer is 3 + 3.
  let assert True = f([1, 3, 4], 6) == 2
  let assert True = f([2, 5, 10, 1], 27) == 4
  Nil
}

fn check_maximum_product(f: fn(List(Int)) -> Int) -> Nil {
  let assert True = f([2, 3, -2, 4]) == 6
  // A zero, which resets the running product rather than poisoning it.
  let assert True = f([-2, 0, -1]) == 0
  // Two negatives make a positive, so the best answer spans the whole array.
  let assert True = f([-2, 3, -4]) == 24
  let assert True = f([0]) == 0
  let assert True = f([-2]) == -2
  let assert True = f([2, -5, -2, -4, 3]) == 24
  let assert True = f([]) == 0
  Nil
}

fn check_word_break(f: fn(String, List(String)) -> Bool) -> Nil {
  let assert True = f("leetcode", ["leet", "code"])
  let assert True = f("applepenapple", ["apple", "pen"])
  // "cats" and "and" leave "og"; "cat" and "sand" leave "og" too.
  let assert False = f("catsandog", ["cats", "dog", "sand", "and", "cat"])
  let assert True = f("", ["a"])
  let assert False = f("a", [])
  let assert True = f("aaaaaaa", ["aaa", "aaaa"])
  Nil
}

fn check_lis(f: fn(List(Int)) -> Int) -> Nil {
  let assert True = f([10, 9, 2, 5, 3, 7, 101, 18]) == 4
  let assert True = f([0, 1, 0, 3, 2, 3]) == 4
  // Strictly increasing, so equal values do not extend anything.
  let assert True = f([7, 7, 7, 7, 7, 7, 7]) == 1
  let assert True = f([]) == 0
  let assert True = f([1]) == 1
  let assert True = f([4, 10, 4, 3, 8, 9]) == 3
  Nil
}

fn check_partition_equal(f: fn(List(Int)) -> Bool) -> Nil {
  let assert True = f([1, 5, 11, 5])
  // Sums to 11, which is odd, so it cannot split however the values fall.
  let assert False = f([1, 2, 3, 5])
  let assert True = f([2, 2])
  let assert False = f([1])
  let assert True = f([1, 1])
  let assert True = f([3, 3, 3, 4, 5])
  Nil
}

/// Generic over the store type, so both variants can carry their own.
fn check_kth_largest_stream(
  new: fn(Int, List(Int)) -> store,
  add: fn(store, Int) -> store,
  kth: fn(store) -> Result(Int, Nil),
) -> Nil {
  let feed = fn(k, initial, values) {
    let #(_, answers) =
      list.fold(values, #(new(k, initial), []), fn(state, value) {
        let #(store, answers) = state
        let store = add(store, value)
        #(store, [kth(store), ..answers])
      })
    list.reverse(answers)
  }

  let assert True =
    feed(3, [4, 5, 8, 2], [3, 5, 10, 9, 4])
    == [Ok(4), Ok(5), Ok(5), Ok(8), Ok(8)]
  let assert True = feed(1, [], [1, 2, 0]) == [Ok(1), Ok(2), Ok(2)]
  // Duplicates are separate entries, so two fives make a second-largest of 5.
  let assert True = feed(2, [], [5, 5]) == [Error(Nil), Ok(5)]
  let assert True = kth(new(2, [])) == Error(Nil)
  Nil
}

fn check_last_stone_weight(f: fn(List(Int)) -> Int) -> Nil {
  let assert True = f([2, 7, 4, 1, 8, 1]) == 1
  let assert True = f([1]) == 1
  let assert True = f([]) == 0
  // Equal stones destroy each other and leave nothing behind.
  let assert True = f([2, 2]) == 0
  let assert True = f([3, 7, 2]) == 2
  let assert True = f([10, 4, 2, 10]) == 2
  Nil
}

fn check_k_closest(f: fn(List(#(Int, Int)), Int) -> List(#(Int, Int))) -> Nil {
  let sorted = fn(points, k) {
    list.sort(f(points, k), fn(a: #(Int, Int), b: #(Int, Int)) {
      case int.compare(a.0, b.0) {
        order.Eq -> int.compare(a.1, b.1)
        other -> other
      }
    })
  }
  let assert True = sorted([#(1, 3), #(-2, 2)], 1) == [#(-2, 2)]
  let assert True =
    sorted([#(3, 3), #(5, -1), #(-2, 4)], 2) == [#(-2, 4), #(3, 3)]
  let assert True = sorted([], 0) == []
  let assert True = sorted([#(0, 0)], 1) == [#(0, 0)]
  let assert True = sorted([#(1, 1), #(2, 2), #(3, 3)], 2) == [#(1, 1), #(2, 2)]
  Nil
}

fn check_kth_largest_array(f: fn(List(Int), Int) -> Result(Int, Nil)) -> Nil {
  let assert True = f([3, 2, 1, 5, 6, 4], 2) == Ok(5)
  // Duplicates count separately: the 4th largest here is 4, not 3.
  let assert True = f([3, 2, 3, 1, 2, 4, 5, 5, 6], 4) == Ok(4)
  let assert True = f([1], 1) == Ok(1)
  let assert True = f([2, 1], 2) == Ok(1)
  let assert True = f([7, 6, 5, 4, 3, 2, 1], 3) == Ok(5)
  let assert True = f([], 1) == Error(Nil)
  Nil
}

fn check_task_scheduler(f: fn(List(String), Int) -> Int) -> Nil {
  let assert True = f(["A", "A", "A", "B", "B", "B"], 2) == 8
  // No cooldown at all, so the answer is just the number of tasks.
  let assert True = f(["A", "A", "A", "B", "B", "B"], 0) == 6
  let assert True = f(["A", "A", "A", "B", "B", "B"], 3) == 10
  let assert True = f([], 2) == 0
  let assert True = f(["A"], 5) == 1
  // Enough other tasks to fill every idle slot, so nothing waits.
  let assert True =
    f(["A", "A", "A", "A", "B", "C", "D", "E", "F", "G"], 2) == 10
  Nil
}

/// Generic over the store type, so both variants can carry their own.
fn check_twitter(
  new: fn() -> store,
  post: fn(store, Int, Int) -> store,
  follow: fn(store, Int, Int) -> store,
  unfollow: fn(store, Int, Int) -> store,
  feed: fn(store, Int) -> List(Int),
) -> Nil {
  let base = post(new(), 1, 5)
  let assert True = feed(base, 1) == [5]

  let followed = post(follow(base, 1, 2), 2, 6)
  let assert True = feed(followed, 1) == [6, 5]
  let assert True = feed(followed, 2) == [6]
  let assert True = feed(followed, 3) == []
  let assert True = feed(unfollow(followed, 1, 2), 1) == [5]

  // Eleven tweets, so the feed has to cap at ten and drop the oldest.
  let eleven =
    list.fold([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], new(), fn(store, tweet) {
      post(store, 1, tweet)
    })
  let assert True = feed(eleven, 1) == [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
  Nil
}

fn check_median_finder(
  new: fn() -> store,
  add: fn(store, Int) -> store,
  median: fn(store) -> Float,
) -> Nil {
  let medians = fn(values) {
    let #(_, answers) =
      list.fold(values, #(new(), []), fn(state, value) {
        let #(finder, answers) = state
        let finder = add(finder, value)
        #(finder, [median(finder), ..answers])
      })
    list.reverse(answers)
  }

  let assert True = medians([1, 2, 3]) == [1.0, 1.5, 2.0]
  let assert True = medians([1, 2, 3, 4, 5]) == [1.0, 1.5, 2.0, 2.5, 3.0]
  // Arriving out of order, which is what the two halves have to survive.
  let assert True = medians([5, 1, 2, 3]) == [5.0, 3.0, 2.0, 2.5]
  let assert True = medians([-1, -2]) == [-1.0, -1.5]
  let assert True = median(new()) == 0.0
  Nil
}

/// Both the outer order and the order within each subset are free, so both are
/// normalised before comparing.
fn normalise_groups(groups: List(List(Int))) -> List(String) {
  groups
  |> list.map(fn(group) {
    group
    |> list.sort(int.compare)
    |> list.map(int.to_string)
    |> string.join(",")
  })
  |> list.sort(string.compare)
}

fn check_subsets(f: fn(List(Int)) -> List(List(Int))) -> Nil {
  let assert True =
    normalise_groups(f([1, 2, 3]))
    == ["", "1", "1,2", "1,2,3", "1,3", "2", "2,3", "3"]
  let assert True = normalise_groups(f([0])) == ["", "0"]
  // The empty list still has one subset: itself.
  let assert True = normalise_groups(f([])) == [""]
  let assert True = list.length(f([1, 2, 3, 4, 5])) == 32
  Nil
}

fn check_combination_sum(f: fn(List(Int), Int) -> List(List(Int))) -> Nil {
  let assert True = normalise_groups(f([2, 3, 6, 7], 7)) == ["2,2,3", "7"]
  // Candidates may be reused, so 2+2+2+2 is a legal combination.
  let assert True =
    normalise_groups(f([2, 3, 5], 8)) == ["2,2,2,2", "2,3,3", "3,5"]
  let assert True = normalise_groups(f([2], 1)) == []
  // A target of zero is met by the empty combination, not by nothing at all.
  let assert True = normalise_groups(f([1], 0)) == [""]
  let assert True = normalise_groups(f([], 3)) == []
  Nil
}

fn check_permutations(f: fn(List(Int)) -> List(List(Int))) -> Nil {
  // Only the outer order is free here: the order within a permutation is the
  // answer, so the inner lists are compared as written.
  let ordered = fn(nums) {
    f(nums)
    |> list.map(fn(permutation) {
      permutation |> list.map(int.to_string) |> string.join(",")
    })
    |> list.sort(string.compare)
  }

  let assert True =
    ordered([1, 2, 3]) == ["1,2,3", "1,3,2", "2,1,3", "2,3,1", "3,1,2", "3,2,1"]
  let assert True = ordered([0, 1]) == ["0,1", "1,0"]
  let assert True = ordered([1]) == ["1"]
  let assert True = ordered([]) == [""]
  let assert True = list.length(f([1, 2, 3, 4])) == 24
  Nil
}

fn check_subsets_ii(f: fn(List(Int)) -> List(List(Int))) -> Nil {
  let assert True =
    normalise_groups(f([1, 2, 2])) == ["", "1", "1,2", "1,2,2", "2", "2,2"]
  let assert True = normalise_groups(f([0])) == ["", "0"]
  let assert True = normalise_groups(f([])) == [""]
  let assert True = normalise_groups(f([1, 1, 1])) == ["", "1", "1,1", "1,1,1"]
  // Duplicates not adjacent in the input, so sorting is part of the answer.
  let assert True = list.length(f([4, 4, 4, 1, 4])) == 10
  Nil
}

fn check_combination_sum_ii(f: fn(List(Int), Int) -> List(List(Int))) -> Nil {
  let assert True =
    normalise_groups(f([10, 1, 2, 7, 6, 1, 5], 8))
    == ["1,1,6", "1,2,5", "1,7", "2,6"]
  // Two of the three 2s are usable together; all three would overshoot.
  let assert True = normalise_groups(f([2, 5, 2, 1, 2], 5)) == ["1,2,2", "5"]
  let assert True = normalise_groups(f([], 3)) == []
  let assert True = normalise_groups(f([1], 1)) == ["1"]
  let assert True = normalise_groups(f([2], 1)) == []
  Nil
}

fn check_word_search(f: fn(List(List(String)), String) -> Bool) -> Nil {
  let board = list.map(["ABCE", "SFCS", "ADEE"], string.to_graphemes)

  let assert True = f(board, "ABCCED")
  let assert True = f(board, "SEE")
  // Reaching the last B would mean reusing the first one.
  let assert False = f(board, "ABCB")
  let assert True = f(board, "")
  let assert False = f(board, "Z")
  let assert False = f([], "A")
  Nil
}

fn check_palindrome_partitioning(f: fn(String) -> List(List(String))) -> Nil {
  // The order of pieces within a partition is the answer, so only the outer
  // list is normalised.
  // Comma rather than a pipe as the separator: a pipe sorts *after* letters,
  // which quietly reorders the expected list.
  let sorted = fn(s) {
    f(s)
    |> list.map(fn(pieces) { string.join(pieces, ",") })
    |> list.sort(string.compare)
  }

  let assert True = sorted("aab") == ["a,a,b", "aa,b"]
  let assert True = sorted("a") == ["a"]
  // The empty string has one partition: no pieces at all.
  let assert True = sorted("") == [""]
  let assert True = sorted("aba") == ["a,b,a", "aba"]
  let assert True = sorted("abc") == ["a,b,c"]
  Nil
}

fn check_letter_combinations(f: fn(String) -> List(String)) -> Nil {
  let sorted = fn(digits) { list.sort(f(digits), string.compare) }

  let assert True =
    sorted("23") == ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]
  // No digits means no combinations \u{2014} not one empty combination.
  let assert True = sorted("") == []
  let assert True = sorted("2") == ["a", "b", "c"]
  // 7 and 9 carry four letters each, unlike the rest.
  let assert True = sorted("9") == ["w", "x", "y", "z"]
  let assert True = list.length(f("79")) == 16
  Nil
}

fn check_n_queens(f: fn(Int) -> List(List(String))) -> Nil {
  let sorted = fn(n) {
    f(n)
    |> list.map(fn(board) { string.join(board, "|") })
    |> list.sort(string.compare)
  }

  // Sorted, so the board starting "..Q." comes first.
  let assert True = sorted(4) == ["..Q.|Q...|...Q|.Q..", ".Q..|...Q|Q...|..Q."]
  let assert True = sorted(1) == ["Q"]
  // Two and three queens cannot be placed at all.
  let assert True = sorted(2) == []
  let assert True = sorted(3) == []
  let assert True = list.length(f(6)) == 4
  Nil
}

fn check_unique_paths(f: fn(Int, Int) -> Int) -> Nil {
  let assert True = f(3, 7) == 28
  let assert True = f(3, 2) == 3
  // Symmetric: swapping the sides cannot change the count.
  let assert True = f(7, 3) == 28
  let assert True = f(1, 5) == 1
  let assert True = f(0, 5) == 0
  let assert True = f(10, 10) == 48_620
  Nil
}

fn check_lcs_strings(f: fn(String, String) -> Int) -> Nil {
  let assert True = f("abcde", "ace") == 3
  let assert True = f("abc", "abc") == 3
  let assert True = f("abc", "def") == 0
  let assert True = f("", "abc") == 0
  let assert True = f("bsbininm", "jmjkbkjkv") == 1
  let assert True = f("ezupkr", "ubmrapg") == 2
  Nil
}

fn check_coin_change_ii(f: fn(Int, List(Int)) -> Int) -> Nil {
  let assert True = f(5, [1, 2, 5]) == 4
  let assert True = f(3, [2]) == 0
  let assert True = f(10, [10]) == 1
  // One way to make nothing: take no coins.
  let assert True = f(0, [1]) == 1
  let assert True = f(5, []) == 0
  // 11 combinations, not the 32 orderings a wrong loop order would count.
  let assert True = f(11, [1, 2, 5]) == 11
  Nil
}

fn check_target_sum(f: fn(List(Int), Int) -> Int) -> Nil {
  let assert True = f([1, 1, 1, 1, 1], 3) == 5
  let assert True = f([1], 1) == 1
  let assert True = f([1], 2) == 0
  // Zeros can take either sign, so each one doubles the count.
  let assert True = f([0, 0, 0, 0, 0], 0) == 32
  let assert True = f([], 0) == 1
  let assert True = f([1, 2, 3, 4, 5], 3) == 3
  Nil
}

fn check_stock_cooldown(f: fn(List(Int)) -> Int) -> Nil {
  let assert True = f([1, 2, 3, 0, 2]) == 3
  let assert True = f([1]) == 0
  let assert True = f([]) == 0
  // Falling prices, so the best trade is no trade.
  let assert True = f([2, 1]) == 0
  // Rising every day: without a cooldown this would be 4 either way, and with
  // one the single buy-and-hold still wins.
  let assert True = f([1, 2, 3, 4, 5]) == 4
  let assert True = f([6, 1, 3, 2, 4, 7]) == 6
  Nil
}

fn check_interleaving(f: fn(String, String, String) -> Bool) -> Nil {
  let assert True = f("aabcc", "dbbca", "aadbbcbcac")
  let assert False = f("aabcc", "dbbca", "aadbbbaccc")
  let assert True = f("", "", "")
  let assert True = f("a", "", "a")
  let assert True = f("", "b", "b")
  let assert True = f("abc", "def", "adbecf")
  Nil
}

fn check_longest_increasing_path(f: fn(List(List(Int))) -> Int) -> Nil {
  let assert True = f([[9, 9, 4], [6, 6, 8], [2, 1, 1]]) == 4
  let assert True = f([[3, 4, 5], [3, 2, 6], [2, 2, 1]]) == 4
  let assert True = f([[1]]) == 1
  let assert True = f([]) == 0
  let assert True = f([[1, 2], [3, 4]]) == 3
  Nil
}

fn check_distinct_subsequences(f: fn(String, String) -> Int) -> Nil {
  let assert True = f("rabbbit", "rabbit") == 3
  let assert True = f("babgbag", "bag") == 5
  let assert True = f("", "a") == 0
  // One way to build the empty target from anything: take nothing.
  let assert True = f("a", "") == 1
  let assert True = f("abc", "abc") == 1
  let assert True = f("aaa", "aa") == 3
  Nil
}

fn check_edit_distance(f: fn(String, String) -> Int) -> Nil {
  let assert True = f("horse", "ros") == 3
  let assert True = f("intention", "execution") == 5
  // From nothing, every character has to be inserted.
  let assert True = f("", "abc") == 3
  let assert True = f("abc", "") == 3
  let assert True = f("abc", "abc") == 0
  let assert True = f("kitten", "sitting") == 3
  Nil
}

fn check_burst_balloons(f: fn(List(Int)) -> Int) -> Nil {
  let assert True = f([3, 1, 5, 8]) == 167
  let assert True = f([1, 5]) == 10
  let assert True = f([]) == 0
  // A lone balloon has 1 on both sides, from the padding.
  let assert True = f([5]) == 5
  let assert True = f([1, 2, 3, 4]) == 40
  Nil
}

fn check_regex_matching(f: fn(String, String) -> Bool) -> Nil {
  let assert False = f("aa", "a")
  let assert True = f("aa", "a*")
  let assert True = f("ab", ".*")
  // c* matching zero copies is what makes this one work.
  let assert True = f("aab", "c*a*b")
  let assert False = f("mississippi", "mis*is*p*.")
  let assert True = f("", ".*")
  let assert True = f("", "")
  let assert True = f("abc", "abc")
  Nil
}

/// Generic over the store type, so both variants can carry their own.
fn check_trie(
  new: fn() -> store,
  insert: fn(store, String) -> store,
  search: fn(store, String) -> Bool,
  starts_with: fn(store, String) -> Bool,
) -> Nil {
  let one = insert(new(), "apple")
  let assert True = search(one, "apple")
  // A stored prefix is not a stored word until it is inserted in its own right
  // \u{2014} which is the whole reason a node needs a terminal flag.
  let assert False = search(one, "app")
  let assert True = starts_with(one, "app")

  let two = insert(one, "app")
  let assert True = search(two, "app")
  let assert False = starts_with(two, "apz")

  let assert False = search(new(), "")
  // Every trie starts with the empty prefix.
  let assert True = starts_with(new(), "")
  Nil
}

fn check_word_dictionary(
  new: fn() -> store,
  add: fn(store, String) -> store,
  search: fn(store, String) -> Bool,
) -> Nil {
  let store = list.fold(["bad", "dad", "mad"], new(), add)

  let assert False = search(store, "pad")
  let assert True = search(store, "bad")
  let assert True = search(store, ".ad")
  let assert True = search(store, "b..")
  let assert True = search(store, "...")
  // Length has to match exactly: a dot stands for one character, not any run.
  let assert False = search(store, "b")
  let assert False = search(store, "....")
  Nil
}

fn check_word_search_ii(
  f: fn(List(List(String)), List(String)) -> List(String),
) -> Nil {
  let board = list.map(["oaan", "etae", "ihkr", "iflv"], string.to_graphemes)
  let sorted = fn(board, words) { list.sort(f(board, words), string.compare) }

  let assert True =
    sorted(board, ["oath", "pea", "eat", "rain"]) == ["eat", "oath"]
  // Would need to reuse the "b", so it is not found.
  let assert True = sorted([["a", "b"], ["c", "d"]], ["abcb"]) == []
  let assert True = sorted([["a"]], ["a"]) == ["a"]
  let assert True = sorted(board, []) == []
  let assert True = sorted([], ["a"]) == []
  Nil
}

fn check_number_of_islands(f: fn(List(List(String))) -> Int) -> Nil {
  let board = fn(rows) { list.map(rows, string.to_graphemes) }

  let assert True = f(board(["11110", "11010", "11000", "00000"])) == 1
  let assert True = f(board(["11000", "11000", "00100", "00011"])) == 3
  let assert True = f(board(["000", "000"])) == 0
  let assert True = f([]) == 0
  // Diagonals do not connect: these are two islands, not one.
  let assert True = f(board(["10", "01"])) == 2
  Nil
}

fn check_clone_graph(f: fn(List(List(Int)), Int) -> List(List(Int))) -> Nil {
  let assert True =
    f([[1, 3], [0, 2], [1, 3], [0, 2]], 0) == [[1, 3], [0, 2], [1, 3], [0, 2]]
  let assert True = f([[1], [0]], 0) == [[1], [0]]
  let assert True = f([[]], 0) == [[]]
  let assert True = f([], 0) == []
  // Only the component containing the start is copied \u{2014} and renumbered, so
  // nodes 2 and 3 come back as 0 and 1.
  let assert True = f([[1], [0], [3], [2]], 2) == [[1], [0]]
  let assert True = f([[], []], 1) == [[]]
  Nil
}

fn check_max_area_of_island(f: fn(List(List(Int))) -> Int) -> Nil {
  let assert True = f([[1, 1, 0], [1, 0, 0], [0, 0, 1]]) == 3
  let assert True = f([[0, 0], [0, 0]]) == 0
  let assert True = f([]) == 0
  let assert True = f([[1]]) == 1
  let assert True = f([[1, 1, 1], [1, 1, 1]]) == 6
  Nil
}

fn check_pacific_atlantic(f: fn(List(List(Int))) -> List(#(Int, Int))) -> Nil {
  let assert True =
    f([
      [1, 2, 2, 3, 5],
      [3, 2, 3, 4, 4],
      [2, 4, 5, 3, 1],
      [6, 7, 1, 4, 5],
      [5, 1, 1, 2, 4],
    ])
    == [#(0, 4), #(1, 3), #(1, 4), #(2, 2), #(3, 0), #(3, 1), #(4, 0)]
  // A single square touches both oceans at once.
  let assert True = f([[1]]) == [#(0, 0)]
  let assert True = f([]) == []
  // All equal heights, so water flows anywhere and every square qualifies.
  let assert True = f([[1, 1], [1, 1]]) == [#(0, 0), #(0, 1), #(1, 0), #(1, 1)]
  Nil
}

fn check_surrounded_regions(
  f: fn(List(List(String))) -> List(List(String)),
) -> Nil {
  let shown = fn(rows) {
    rows
    |> list.map(string.to_graphemes)
    |> f
    |> list.map(string.concat)
  }

  let assert True =
    shown(["XXXX", "XOOX", "XXOX", "XOXX"]) == ["XXXX", "XXXX", "XXXX", "XOXX"]
  let assert True = shown(["X"]) == ["X"]
  // A lone O on the border escapes.
  let assert True = shown(["O"]) == ["O"]
  let assert True = shown([]) == []
  // Both Os reach the top edge, so neither is captured.
  let assert True = shown(["XOX", "XOX", "XXX"]) == ["XOX", "XOX", "XXX"]
  Nil
}

fn check_rotting_oranges(f: fn(List(List(Int))) -> Int) -> Nil {
  let assert True = f([[2, 1, 1], [1, 1, 0], [0, 1, 1]]) == 4
  // The bottom-left orange is walled off, so it never rots.
  let assert True = f([[2, 1, 1], [0, 1, 1], [1, 0, 1]]) == -1
  // Nothing fresh to begin with, so no time passes.
  let assert True = f([[0, 2]]) == 0
  let assert True = f([]) == 0
  let assert True = f([[1]]) == -1
  let assert True = f([[0]]) == 0
  Nil
}

fn check_walls_and_gates(f: fn(List(List(Int))) -> List(List(Int))) -> Nil {
  let infinity = 2_147_483_647

  let assert True =
    f([
      [infinity, -1, 0, infinity],
      [infinity, infinity, infinity, -1],
      [infinity, -1, infinity, -1],
      [0, -1, infinity, infinity],
    ])
    == [[3, -1, 0, 1], [2, 2, 1, -1], [1, -1, 2, -1], [0, -1, 3, 4]]
  let assert True = f([[0]]) == [[0]]
  let assert True = f([[-1]]) == [[-1]]
  let assert True = f([]) == []
  // No gate anywhere, so every room stays unreachable.
  let assert True = f([[infinity, infinity]]) == [[infinity, infinity]]
  Nil
}

fn check_course_schedule(f: fn(Int, List(#(Int, Int))) -> Bool) -> Nil {
  let assert True = f(2, [#(1, 0)])
  let assert False = f(2, [#(1, 0), #(0, 1)])
  let assert True = f(1, [])
  let assert True = f(0, [])
  let assert True = f(4, [#(1, 0), #(2, 1), #(3, 2)])
  // A three-course cycle, which a "seen" set alone would not catch.
  let assert False = f(3, [#(0, 1), #(1, 2), #(2, 0)])
  Nil
}

/// Any valid order is acceptable, so this checks the order rather than
/// comparing it: every course once, and every prerequisite before its course.
fn check_course_schedule_ii(f: fn(Int, List(#(Int, Int))) -> List(Int)) -> Nil {
  let valid = fn(count, prerequisites) {
    let order = f(count, prerequisites)
    let positions = list.index_map(order, fn(course, i) { #(course, i) })
    let at = fn(course) {
      case list.find(positions, fn(pair: #(Int, Int)) { pair.0 == course }) {
        Ok(#(_, i)) -> Ok(i)
        Error(Nil) -> Error(Nil)
      }
    }

    list.length(order) == count
    && list.length(list.unique(order)) == count
    && list.all(prerequisites, fn(pair: #(Int, Int)) {
      case at(pair.1), at(pair.0) {
        Ok(before), Ok(after) -> before < after
        _, _ -> False
      }
    })
  }

  let assert True = valid(2, [#(1, 0)])
  let assert True = valid(4, [#(1, 0), #(2, 0), #(3, 1), #(3, 2)])
  let assert True = valid(1, [])
  let assert True = valid(3, [])
  // A cycle, so there is no order at all.
  let assert True = f(2, [#(0, 1), #(1, 0)]) == []
  let assert True = f(0, []) == []
  Nil
}

fn check_redundant_connection(f: fn(List(#(Int, Int))) -> #(Int, Int)) -> Nil {
  let assert True = f([#(1, 2), #(1, 3), #(2, 3)]) == #(2, 3)
  // The answer is the *last* edge that closes a cycle, not the first.
  let assert True = f([#(1, 2), #(2, 3), #(3, 4), #(1, 4), #(1, 5)]) == #(1, 4)
  let assert True = f([#(1, 2), #(2, 1)]) == #(2, 1)
  Nil
}

fn check_connected_components(f: fn(Int, List(#(Int, Int))) -> Int) -> Nil {
  let assert True = f(5, [#(0, 1), #(1, 2), #(3, 4)]) == 2
  let assert True = f(5, [#(0, 1), #(1, 2), #(2, 3), #(3, 4)]) == 1
  let assert True = f(3, []) == 3
  let assert True = f(0, []) == 0
  let assert True = f(1, []) == 1
  // The same edge twice must only merge once.
  let assert True = f(4, [#(0, 1), #(1, 0)]) == 3
  Nil
}

fn check_graph_valid_tree(f: fn(Int, List(#(Int, Int))) -> Bool) -> Nil {
  let assert True = f(5, [#(0, 1), #(0, 2), #(0, 3), #(1, 4)])
  let assert False = f(5, [#(0, 1), #(1, 2), #(2, 3), #(1, 3), #(1, 4)])
  let assert True = f(1, [])
  let assert True = f(0, [])
  // Acyclic but not connected, which the edge count alone would let through.
  let assert False = f(2, [])
  let assert False = f(4, [#(0, 1), #(2, 3)])
  Nil
}

fn check_word_ladder(f: fn(String, String, List(String)) -> Int) -> Nil {
  let assert True =
    f("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]) == 5
  // The target is not in the list, so no ladder can end there.
  let assert True = f("hit", "cog", ["hot", "dot", "dog", "lot", "log"]) == 0
  let assert True = f("a", "c", ["a", "b", "c"]) == 2
  // Start and end are the same word, which is a ladder of length one.
  let assert True = f("hit", "hit", ["hit"]) == 1
  let assert True = f("hot", "dog", ["hot", "dog"]) == 0
  Nil
}

fn check_reconstruct_itinerary(
  f: fn(List(#(String, String))) -> List(String),
) -> Nil {
  let assert ["JFK", "MUC", "LHR", "SFO", "SJC"] =
    f([
      #("MUC", "LHR"),
      #("JFK", "MUC"),
      #("SFO", "SJC"),
      #("LHR", "SFO"),
    ])
  // Two ways out of JFK, and the smaller one has to be taken first.
  let assert ["JFK", "ATL", "JFK", "SFO", "ATL", "SFO"] =
    f([
      #("JFK", "SFO"),
      #("JFK", "ATL"),
      #("SFO", "ATL"),
      #("ATL", "JFK"),
      #("ATL", "SFO"),
    ])
  // KUL is smaller than NRT but is a dead end, so it cannot be taken first.
  let assert ["JFK", "NRT", "JFK", "KUL"] =
    f([#("JFK", "KUL"), #("JFK", "NRT"), #("NRT", "JFK")])
  let assert ["JFK"] = f([])
  Nil
}

fn check_min_cost_connect_points(f: fn(List(#(Int, Int))) -> Int) -> Nil {
  let assert True = f([#(0, 0), #(2, 2), #(3, 10), #(5, 2), #(7, 0)]) == 20
  let assert True = f([#(3, 12), #(-2, 5), #(-4, 1)]) == 18
  let assert True = f([]) == 0
  let assert True = f([#(1, 1)]) == 0
  let assert True = f([#(0, 0), #(0, 5)]) == 5
  Nil
}

fn check_network_delay_time(
  f: fn(List(#(Int, Int, Int)), Int, Int) -> Int,
) -> Nil {
  let assert True = f([#(2, 1, 1), #(2, 3, 1), #(3, 4, 1)], 4, 2) == 2
  let assert True = f([#(1, 2, 1)], 2, 1) == 1
  // Signals only travel the way the edge points, so node 1 never hears it.
  let assert True = f([#(1, 2, 1)], 2, 2) == -1
  let assert True = f([], 1, 1) == 0
  // The two-hop route is shorter than the direct edge.
  let assert True = f([#(1, 2, 1), #(2, 3, 2), #(1, 3, 4)], 3, 1) == 3
  Nil
}

fn check_swim_in_water(f: fn(List(List(Int))) -> Int) -> Nil {
  let assert True = f([[0, 2], [1, 3]]) == 3
  let assert True =
    f([
      [0, 1, 2, 3, 4],
      [24, 23, 22, 21, 5],
      [12, 13, 14, 15, 16],
      [11, 17, 18, 19, 20],
      [10, 9, 8, 7, 6],
    ])
    == 16
  let assert True = f([[0]]) == 0
  // The starting cell counts too, even when everything after it is shallower.
  let assert True = f([[3, 2], [1, 0]]) == 3
  Nil
}

fn check_alien_order(f: fn(List(String)) -> String) -> Nil {
  let assert "wertf" = f(["wrt", "wrf", "er", "ett", "rftt"])
  let assert "zx" = f(["z", "x"])
  // z before x before z: no alphabet can satisfy that.
  let assert "" = f(["z", "x", "z"])
  // A word followed by its own prefix is impossible however letters are ordered.
  let assert "" = f(["abc", "ab"])
  let assert "z" = f(["z", "z"])
  let assert "xyz" = f(["x", "y", "z"])
  Nil
}

fn check_cheapest_flights(
  f: fn(Int, List(#(Int, Int, Int)), Int, Int, Int) -> Int,
) -> Nil {
  let assert True =
    f(
      4,
      [#(0, 1, 100), #(1, 2, 100), #(2, 0, 100), #(1, 3, 600), #(2, 3, 200)],
      0,
      3,
      1,
    )
    == 700
  let assert True =
    f(3, [#(0, 1, 100), #(1, 2, 100), #(0, 2, 500)], 0, 2, 1) == 200
  // One fewer stop allowed, so the cheap two-hop route is out of reach.
  let assert True =
    f(3, [#(0, 1, 100), #(1, 2, 100), #(0, 2, 500)], 0, 2, 0) == 500
  let assert True = f(2, [], 0, 1, 5) == -1
  let assert True = f(1, [], 0, 0, 0) == 0
  let assert True =
    f(
      5,
      [#(0, 1, 5), #(1, 2, 5), #(0, 3, 2), #(3, 1, 2), #(1, 4, 1), #(4, 2, 1)],
      0,
      2,
      2,
    )
    == 7
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
