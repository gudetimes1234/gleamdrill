need :count_bits

tc "count_bits(5)", [0, 1, 1, 2, 1, 2], count_bits(5)
tc "count_bits(2)", [0, 1, 1], count_bits(2)
tc "count_bits(0)", [0], count_bits(0)
tc "count_bits(8)", [0, 1, 1, 2, 1, 2, 2, 3, 1], count_bits(8)
