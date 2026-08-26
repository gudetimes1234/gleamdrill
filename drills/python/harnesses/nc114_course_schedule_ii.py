try:
    (findOrder)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

# Any valid order is acceptable, so the harness checks the order rather than
# comparing it: every course appears exactly once, and every prerequisite comes
# before the course that needs it.
def __valid__(numCourses, prerequisites):
    order = findOrder(numCourses, prerequisites)
    if len(order) != numCourses or len(set(order)) != numCourses:
        return False
    at = {course: i for i, course in enumerate(order)}
    return all(at[prereq] < at[course] for course, prereq in prerequisites)

__case__("findOrder(2, [[1,0]]) is a valid order", True, __valid__(2, [[1, 0]]))
__case__("findOrder(4, [[1,0],[2,0],[3,1],[3,2]]) is a valid order", True, __valid__(4, [[1, 0], [2, 0], [3, 1], [3, 2]]))
__case__("findOrder(1, []) is a valid order", True, __valid__(1, []))
__case__("findOrder(3, []) is a valid order", True, __valid__(3, []))
__case__("findOrder(2, [[0,1],[1,0]]) -- a cycle, so no order", [], findOrder(2, [[0, 1], [1, 0]]))
__case__("findOrder(0, [])", [], findOrder(0, []))
