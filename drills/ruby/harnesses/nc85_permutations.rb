need :permute

# The outer order is free but the order *within* each permutation is the answer.
def sorted_permutations(nums) = permute(nums).map { |p| p.join(",") }.sort

tc "permute([1, 2, 3])", ["1,2,3", "1,3,2", "2,1,3", "2,3,1", "3,1,2", "3,2,1"], sorted_permutations([1, 2, 3])
tc "permute([0, 1])", ["0,1", "1,0"], sorted_permutations([0, 1])
tc "permute([1])", ["1"], sorted_permutations([1])
tc "permute([])", [""], sorted_permutations([])
tc "permute of four elements count", 24, permute([1, 2, 3, 4]).length
