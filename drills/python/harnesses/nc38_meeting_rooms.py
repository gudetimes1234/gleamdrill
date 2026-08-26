try:
    (canAttendMeetings)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("canAttendMeetings([[0, 30], [5, 10], [15, 20]])", False, canAttendMeetings([[0, 30], [5, 10], [15, 20]]))
__case__("canAttendMeetings([[7, 10], [2, 4]])", True, canAttendMeetings([[7, 10], [2, 4]]))
__case__("canAttendMeetings([])", True, canAttendMeetings([]))
__case__("canAttendMeetings([[1, 5]])", True, canAttendMeetings([[1, 5]]))
__case__("canAttendMeetings([[1, 5], [5, 10]])", True, canAttendMeetings([[1, 5], [5, 10]]))
__case__("canAttendMeetings([[5, 10], [1, 6]])", False, canAttendMeetings([[5, 10], [1, 6]]))
