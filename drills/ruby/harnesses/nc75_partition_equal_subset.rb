need :can_partition

tc "can_partition([1, 5, 11, 5])", true, can_partition([1, 5, 11, 5])
tc "can_partition([1, 2, 3, 5])", false, can_partition([1, 2, 3, 5])
tc "can_partition([2, 2])", true, can_partition([2, 2])
tc "can_partition([1])", false, can_partition([1])
tc "can_partition([1, 1])", true, can_partition([1, 1])
tc "can_partition([3, 3, 3, 4, 5])", true, can_partition([3, 3, 3, 4, 5])
