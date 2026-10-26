need :is_n_straight_hand

tc "is_n_straight_hand([1, 2, 3, 6, 2, 3, 4, 7, 8], 3)", true, is_n_straight_hand([1, 2, 3, 6, 2, 3, 4, 7, 8], 3)
tc "is_n_straight_hand([1, 2, 3, 4, 5], 4)", false, is_n_straight_hand([1, 2, 3, 4, 5], 4)
tc "is_n_straight_hand([1, 2, 3, 4, 5, 6], 2)", true, is_n_straight_hand([1, 2, 3, 4, 5, 6], 2)
tc "is_n_straight_hand([], 1)", true, is_n_straight_hand([], 1)
tc "is_n_straight_hand([1, 1, 2, 2, 3, 3], 3)", true, is_n_straight_hand([1, 1, 2, 2, 3, 3], 3)
tc "is_n_straight_hand([8, 10, 12], 3)", false, is_n_straight_hand([8, 10, 12], 3)
