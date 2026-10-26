need :can_jump

tc "can_jump([2, 3, 1, 1, 4])", true, can_jump([2, 3, 1, 1, 4])
tc "can_jump([3, 2, 1, 0, 4])", false, can_jump([3, 2, 1, 0, 4])
tc "can_jump([0])", true, can_jump([0])
tc "can_jump([])", true, can_jump([])
tc "can_jump([1, 0, 1, 0])", false, can_jump([1, 0, 1, 0])
tc "can_jump([2, 0, 0])", true, can_jump([2, 0, 0])
