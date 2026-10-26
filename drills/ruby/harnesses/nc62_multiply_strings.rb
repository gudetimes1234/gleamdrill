need :multiply

tc 'multiply("2", "3")', "6", multiply("2", "3")
tc 'multiply("123", "456")', "56088", multiply("123", "456")
tc 'multiply("0", "52")', "0", multiply("0", "52")
tc 'multiply("9", "9")', "81", multiply("9", "9")
tc 'multiply("999", "999")', "998001", multiply("999", "999")
tc 'multiply("123456789", "987654321")', "121932631112635269", multiply("123456789", "987654321")
