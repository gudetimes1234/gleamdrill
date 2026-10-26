need :can_attend_meetings

tc "can_attend_meetings([[0, 30], [5, 10], [15, 20]])", false, can_attend_meetings([[0, 30], [5, 10], [15, 20]])
tc "can_attend_meetings([[7, 10], [2, 4]])", true, can_attend_meetings([[7, 10], [2, 4]])
tc "can_attend_meetings([])", true, can_attend_meetings([])
tc "can_attend_meetings([[1, 5]])", true, can_attend_meetings([[1, 5]])
tc "can_attend_meetings([[1, 5], [5, 10]])", true, can_attend_meetings([[1, 5], [5, 10]])
tc "can_attend_meetings([[5, 10], [1, 6]])", false, can_attend_meetings([[5, 10], [1, 6]])
