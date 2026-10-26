need :KthLargest

def stream(k, initial, added)
  store = KthLargest.new(k, initial)
  added.map { |value| store.add(value) }
end

tc "k = 3 over [4, 5, 8, 2] then 3, 5, 10, 9, 4", [4, 5, 5, 8, 8], stream(3, [4, 5, 8, 2], [3, 5, 10, 9, 4])
tc "k = 1 over [] then 1, 2, 0", [1, 2, 2], stream(1, [], [1, 2, 0])
tc "k = 2 over [] then 5, 5", [nil, 5], stream(2, [], [5, 5])
