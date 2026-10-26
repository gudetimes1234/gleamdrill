need :length_of_lis

tc "length_of_lis([10, 9, 2, 5, 3, 7, 101, 18])", 4, length_of_lis([10, 9, 2, 5, 3, 7, 101, 18])
tc "length_of_lis([0, 1, 0, 3, 2, 3])", 4, length_of_lis([0, 1, 0, 3, 2, 3])
tc "length_of_lis([7, 7, 7, 7, 7, 7, 7])", 1, length_of_lis([7, 7, 7, 7, 7, 7, 7])
tc "length_of_lis([])", 0, length_of_lis([])
tc "length_of_lis([1])", 1, length_of_lis([1])
tc "length_of_lis([4, 10, 4, 3, 8, 9])", 3, length_of_lis([4, 10, 4, 3, 8, 9])
