need :DetectSquares

store = DetectSquares.new
store.add([3, 10])
store.add([11, 2])
store.add([3, 2])

tc "count([11, 10]) with one of each corner", 1, store.count([11, 10])
tc "count([14, 8]) -- no square", 0, store.count([14, 8])

store.add([11, 2])

tc "count([11, 10]) after adding [11, 2] twice", 2, store.count([11, 10])
tc "count on an empty store", 0, DetectSquares.new.count([0, 0])

unit = DetectSquares.new
unit.add([0, 1])
unit.add([1, 0])
unit.add([1, 1])

tc "count([0, 0]) on the unit square", 1, unit.count([0, 0])
