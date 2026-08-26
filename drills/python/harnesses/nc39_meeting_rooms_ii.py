try:
    (minMeetingRooms)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("minMeetingRooms([[0, 30], [5, 10], [15, 20]])", 2, minMeetingRooms([[0, 30], [5, 10], [15, 20]]))
__case__("minMeetingRooms([[7, 10], [2, 4]])", 1, minMeetingRooms([[7, 10], [2, 4]]))
__case__("minMeetingRooms([])", 0, minMeetingRooms([]))
__case__("minMeetingRooms([[1, 5], [5, 10]])", 1, minMeetingRooms([[1, 5], [5, 10]]))
__case__("minMeetingRooms(six overlapping meetings)", 4, minMeetingRooms([[1, 10], [2, 7], [3, 19], [8, 12], [10, 20], [11, 30]]))
