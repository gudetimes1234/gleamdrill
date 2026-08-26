[
  {"min_meeting_rooms([{0, 30}, {5, 10}, {15, 20}])", inspect(2),
   inspect(Solution.min_meeting_rooms([{0, 30}, {5, 10}, {15, 20}]))},
  {"min_meeting_rooms([{7, 10}, {2, 4}])", inspect(1),
   inspect(Solution.min_meeting_rooms([{7, 10}, {2, 4}]))},
  {"min_meeting_rooms([])", inspect(0), inspect(Solution.min_meeting_rooms([]))},
  {"min_meeting_rooms([{1, 5}, {5, 10}])", inspect(1),
   inspect(Solution.min_meeting_rooms([{1, 5}, {5, 10}]))},
  {"min_meeting_rooms(six overlapping meetings)", inspect(4),
   inspect(
     Solution.min_meeting_rooms([{1, 10}, {2, 7}, {3, 19}, {8, 12}, {10, 20}, {11, 30}])
   )}
]
