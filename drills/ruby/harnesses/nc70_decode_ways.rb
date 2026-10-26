need :num_decodings

tc 'num_decodings("12")', 2, num_decodings("12")
tc 'num_decodings("226")', 3, num_decodings("226")
tc 'num_decodings("06")', 0, num_decodings("06")
tc 'num_decodings("0")', 0, num_decodings("0")
tc 'num_decodings("")', 0, num_decodings("")
tc 'num_decodings("10")', 1, num_decodings("10")
tc 'num_decodings("2101")', 1, num_decodings("2101")
tc 'num_decodings("11106")', 2, num_decodings("11106")
