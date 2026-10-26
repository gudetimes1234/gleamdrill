need :top_k_frequent

# Any order of the k most frequent will do.
tc "top_k_frequent([1, 1, 1, 2, 2, 3], 2)", [1, 2], top_k_frequent([1, 1, 1, 2, 2, 3], 2).sort
tc "top_k_frequent([1], 1)", [1], top_k_frequent([1], 1).sort
tc "top_k_frequent([5, 5, 4, 4, 4, 3], 1)", [4], top_k_frequent([5, 5, 4, 4, 4, 3], 1).sort
