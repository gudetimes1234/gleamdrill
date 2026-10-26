need :three_sum

# Triplets and their order are free: compare them sorted.
def normalised(triplets) = triplets.map(&:sort).sort

tc "three_sum([-1, 0, 1, 2, -1, -4])", [[-1, -1, 2], [-1, 0, 1]], normalised(three_sum([-1, 0, 1, 2, -1, -4]))
tc "three_sum([0, 1, 1])", [], normalised(three_sum([0, 1, 1]))
tc "three_sum([0, 0, 0])", [[0, 0, 0]], normalised(three_sum([0, 0, 0]))
