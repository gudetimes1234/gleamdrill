need :min_meeting_rooms

tc "min_meeting_rooms([[0, 30], [5, 10], [15, 20]])", 2, min_meeting_rooms([[0, 30], [5, 10], [15, 20]])
tc "min_meeting_rooms([[7, 10], [2, 4]])", 1, min_meeting_rooms([[7, 10], [2, 4]])
tc "min_meeting_rooms([])", 0, min_meeting_rooms([])
tc "min_meeting_rooms([[1, 5], [5, 10]])", 1, min_meeting_rooms([[1, 5], [5, 10]])
tc "min_meeting_rooms(six overlapping meetings)", 4,
   min_meeting_rooms([[1, 10], [2, 7], [3, 19], [8, 12], [10, 20], [11, 30]])
