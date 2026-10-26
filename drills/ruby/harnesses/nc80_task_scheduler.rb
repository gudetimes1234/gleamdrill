need :least_interval

tc 'least_interval(["A", "A", "A", "B", "B", "B"], 2)', 8, least_interval(["A", "A", "A", "B", "B", "B"], 2)
tc 'least_interval(["A", "A", "A", "B", "B", "B"], 0)', 6, least_interval(["A", "A", "A", "B", "B", "B"], 0)
tc 'least_interval(["A", "A", "A", "B", "B", "B"], 3)', 10, least_interval(["A", "A", "A", "B", "B", "B"], 3)
tc "least_interval([], 2)", 0, least_interval([], 2)
tc 'least_interval(["A"], 5)', 1, least_interval(["A"], 5)
tc "least_interval(four As and six singles, 2)", 10,
   least_interval(["A", "A", "A", "A", "B", "C", "D", "E", "F", "G"], 2)
