need :combination_sum2

def sorted_sums(candidates, target) = combination_sum2(candidates, target).map { |c| c.sort.join(",") }.sort

tc "combination_sum2([10, 1, 2, 7, 6, 1, 5], 8)", ["1,1,6", "1,2,5", "1,7", "2,6"], sorted_sums([10, 1, 2, 7, 6, 1, 5], 8)
tc "combination_sum2([2, 5, 2, 1, 2], 5)", ["1,2,2", "5"], sorted_sums([2, 5, 2, 1, 2], 5)
tc "combination_sum2([], 3)", [], sorted_sums([], 3)
tc "combination_sum2([1], 1)", ["1"], sorted_sums([1], 1)
tc "combination_sum2([2], 1)", [], sorted_sums([2], 1)
