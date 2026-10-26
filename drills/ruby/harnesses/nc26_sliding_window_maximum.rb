need :max_sliding_window

tc "max_sliding_window([1, 3, -1, -3, 5, 3, 6, 7], 3)", [3, 3, 5, 5, 6, 7], max_sliding_window([1, 3, -1, -3, 5, 3, 6, 7], 3)
tc "max_sliding_window([1], 1)", [1], max_sliding_window([1], 1)
tc "max_sliding_window([], 3)", [], max_sliding_window([], 3)
tc "max_sliding_window([9, 8, 7, 6], 2)", [9, 8, 7], max_sliding_window([9, 8, 7, 6], 2)
tc "max_sliding_window([1, -1], 1)", [1, -1], max_sliding_window([1, -1], 1)
tc "max_sliding_window([-7, -8, 7, 5, 7, 1, 6, 0], 4)", [7, 7, 7, 7, 7], max_sliding_window([-7, -8, 7, 5, 7, 1, 6, 0], 4)
