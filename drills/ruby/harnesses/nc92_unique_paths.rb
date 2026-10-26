need :unique_paths

tc "unique_paths(3, 7)", 28, unique_paths(3, 7)
tc "unique_paths(3, 2)", 3, unique_paths(3, 2)
tc "unique_paths(7, 3)", 28, unique_paths(7, 3)
tc "unique_paths(1, 5)", 1, unique_paths(1, 5)
tc "unique_paths(0, 5)", 0, unique_paths(0, 5)
tc "unique_paths(10, 10)", 48620, unique_paths(10, 10)
