need :partition

# The order of pieces within a partition is the answer, so only the outer list
# is normalised. Comma rather than a pipe: a pipe sorts after letters.
def sorted_partitions(s) = partition(s).map { |pieces| pieces.join(",") }.sort

tc 'partition("aab")', ["a,a,b", "aa,b"], sorted_partitions("aab")
tc 'partition("a")', ["a"], sorted_partitions("a")
tc 'partition("")', [""], sorted_partitions("")
tc 'partition("aba")', ["a,b,a", "aba"], sorted_partitions("aba")
tc 'partition("abc")', ["a,b,c"], sorted_partitions("abc")
