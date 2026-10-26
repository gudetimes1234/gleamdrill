need :max_sub_array

tc "max_sub_array([-2, 1, -3, 4, -1, 2, 1, -5, 4])", 6, max_sub_array([-2, 1, -3, 4, -1, 2, 1, -5, 4])
tc "max_sub_array([1])", 1, max_sub_array([1])
tc "max_sub_array([5, 4, -1, 7, 8])", 23, max_sub_array([5, 4, -1, 7, 8])
tc "max_sub_array([-1])", -1, max_sub_array([-1])
tc "max_sub_array([-2, -1])", -1, max_sub_array([-2, -1])
tc "max_sub_array([])", 0, max_sub_array([])
