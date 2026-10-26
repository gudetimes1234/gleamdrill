need :find_median_sorted_arrays

tc "find_median_sorted_arrays([1, 3], [2])", 2.0, find_median_sorted_arrays([1, 3], [2])
tc "find_median_sorted_arrays([1, 2], [3, 4])", 2.5, find_median_sorted_arrays([1, 2], [3, 4])
tc "find_median_sorted_arrays([], [1])", 1.0, find_median_sorted_arrays([], [1])
tc "find_median_sorted_arrays([2], [])", 2.0, find_median_sorted_arrays([2], [])
tc "find_median_sorted_arrays([], [])", 0.0, find_median_sorted_arrays([], [])
tc "find_median_sorted_arrays([1, 2], [])", 1.5, find_median_sorted_arrays([1, 2], [])
tc "find_median_sorted_arrays([1, 3, 5, 7], [2, 4, 6])", 4.0, find_median_sorted_arrays([1, 3, 5, 7], [2, 4, 6])
