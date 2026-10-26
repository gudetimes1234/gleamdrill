need :subsets_with_dup

def sorted_subsets(nums) = subsets_with_dup(nums).map { |s| s.sort.join(",") }.sort

tc "subsets_with_dup([1, 2, 2])", ["", "1", "1,2", "1,2,2", "2", "2,2"], sorted_subsets([1, 2, 2])
tc "subsets_with_dup([0])", ["", "0"], sorted_subsets([0])
tc "subsets_with_dup([])", [""], sorted_subsets([])
tc "subsets_with_dup([1, 1, 1])", ["", "1", "1,1", "1,1,1"], sorted_subsets([1, 1, 1])
tc "subsets_with_dup([4, 4, 4, 1, 4]) count", 10, subsets_with_dup([4, 4, 4, 1, 4]).length
