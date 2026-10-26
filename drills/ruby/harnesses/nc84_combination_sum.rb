need :combination_sum

def sorted_sums(candidates, target) = combination_sum(candidates, target).map { |c| c.sort.join(",") }.sort

tc "combination_sum([2, 3, 6, 7], 7)", ["2,2,3", "7"], sorted_sums([2, 3, 6, 7], 7)
tc "combination_sum([2, 3, 5], 8)", ["2,2,2,2", "2,3,3", "3,5"], sorted_sums([2, 3, 5], 8)
tc "combination_sum([2], 1)", [], sorted_sums([2], 1)
tc "combination_sum([1], 0)", [""], sorted_sums([1], 0)
tc "combination_sum([], 3)", [], sorted_sums([], 3)
