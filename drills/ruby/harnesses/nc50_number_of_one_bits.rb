need :hamming_weight

tc "hamming_weight(11)", 3, hamming_weight(11)
tc "hamming_weight(128)", 1, hamming_weight(128)
tc "hamming_weight(0)", 0, hamming_weight(0)
tc "hamming_weight(2147483645)", 30, hamming_weight(2147483645)
tc "hamming_weight(1)", 1, hamming_weight(1)
