need :my_pow

tc "my_pow(2.0, 10)", 1024.0, my_pow(2.0, 10)
tc "my_pow(2.0, -2)", 0.25, my_pow(2.0, -2)
tc "my_pow(2.0, 0)", 1.0, my_pow(2.0, 0)
tc "my_pow(0.5, 3)", 0.125, my_pow(0.5, 3)
tc "my_pow(-2.0, 3)", -8.0, my_pow(-2.0, 3)
tc "my_pow(2.0, 1)", 2.0, my_pow(2.0, 1)
tc "my_pow(0.0, 5)", 0.0, my_pow(0.0, 5)
