need :merge_triplets

tc "merge_triplets([[2, 5, 3], [1, 8, 4], [1, 7, 5]], [2, 7, 5])", true,
   merge_triplets([[2, 5, 3], [1, 8, 4], [1, 7, 5]], [2, 7, 5])
tc "merge_triplets([[3, 4, 5], [4, 5, 6]], [3, 2, 5])", false, merge_triplets([[3, 4, 5], [4, 5, 6]], [3, 2, 5])
tc "merge_triplets([[2, 5, 3], [2, 3, 4], [1, 2, 5], [5, 2, 3]], [5, 5, 5])", true,
   merge_triplets([[2, 5, 3], [2, 3, 4], [1, 2, 5], [5, 2, 3]], [5, 5, 5])
tc "merge_triplets([[1, 1, 1]], [1, 1, 1])", true, merge_triplets([[1, 1, 1]], [1, 1, 1])
tc "merge_triplets([], [1, 1, 1])", false, merge_triplets([], [1, 1, 1])
tc "merge_triplets([[1, 2, 3]], [3, 2, 1])", false, merge_triplets([[1, 2, 3]], [3, 2, 1])
