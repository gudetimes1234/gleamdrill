try:
    (rotate)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__case__("rotate([[1, 2, 3], [4, 5, 6], [7, 8, 9]])", [[7, 4, 1], [8, 5, 2], [9, 6, 3]], rotate([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))
__case__("rotate([[1, 2], [3, 4]])", [[3, 1], [4, 2]], rotate([[1, 2], [3, 4]]))
__case__("rotate([[1]])", [[1]], rotate([[1]]))
__case__("rotate([])", [], rotate([]))
__case__("rotate(4x4)", [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]], rotate([[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]]))
