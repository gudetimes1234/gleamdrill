need :find_order

# Any valid order is acceptable, so the harness checks the order rather than
# comparing it: every course appears exactly once, and every prerequisite comes
# before the course that needs it.
def valid_order?(num_courses, prerequisites)
  order = find_order(num_courses, prerequisites)
  return false if order.length != num_courses || order.uniq.length != num_courses

  at = order.each_with_index.to_h
  prerequisites.all? { |course, prereq| at[prereq] < at[course] }
end

tc "find_order(2, [[1, 0]]) is a valid order", true, valid_order?(2, [[1, 0]])
tc "find_order(4, [[1, 0], [2, 0], [3, 1], [3, 2]]) is a valid order", true, valid_order?(4, [[1, 0], [2, 0], [3, 1], [3, 2]])
tc "find_order(1, []) is a valid order", true, valid_order?(1, [])
tc "find_order(3, []) is a valid order", true, valid_order?(3, [])
tc "find_order(2, [[0, 1], [1, 0]]) -- a cycle, so no order", [], find_order(2, [[0, 1], [1, 0]])
tc "find_order(0, [])", [], find_order(0, [])
