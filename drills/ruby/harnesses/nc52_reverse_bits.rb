need :reverse_bits

tc "reverse_bits(43261596)", 964176192, reverse_bits(43261596)
tc "reverse_bits(4294967293)", 3221225471, reverse_bits(4294967293)
tc "reverse_bits(0)", 0, reverse_bits(0)
tc "reverse_bits(1)", 2147483648, reverse_bits(1)
