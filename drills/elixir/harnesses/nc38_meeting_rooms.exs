[
  {"can_attend_meetings?([{0, 30}, {5, 10}, {15, 20}])", inspect(false),
   inspect(Solution.can_attend_meetings?([{0, 30}, {5, 10}, {15, 20}]))},
  {"can_attend_meetings?([{7, 10}, {2, 4}])", inspect(true),
   inspect(Solution.can_attend_meetings?([{7, 10}, {2, 4}]))},
  {"can_attend_meetings?([])", inspect(true), inspect(Solution.can_attend_meetings?([]))},
  {"can_attend_meetings?([{1, 5}])", inspect(true),
   inspect(Solution.can_attend_meetings?([{1, 5}]))},
  {"can_attend_meetings?([{1, 5}, {5, 10}])", inspect(true),
   inspect(Solution.can_attend_meetings?([{1, 5}, {5, 10}]))},
  {"can_attend_meetings?([{5, 10}, {1, 6}])", inspect(false),
   inspect(Solution.can_attend_meetings?([{5, 10}, {1, 6}]))}
]
