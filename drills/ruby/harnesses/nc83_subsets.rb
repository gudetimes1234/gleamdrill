need :subsets

# Both the outer order and the order within each subset are free.
def sorted_subsets(nums) = subsets(nums).map { |s| s.sort.join(",") }.sort

tc "subsets([1, 2, 3])", ["", "1", "1,2", "1,2,3", "1,3", "2", "2,3", "3"], sorted_subsets([1, 2, 3])
tc "subsets([0])", ["", "0"], sorted_subsets([0])
tc "subsets([])", [""], sorted_subsets([])
tc "subsets of five elements count", 32, subsets([1, 2, 3, 4, 5]).length
