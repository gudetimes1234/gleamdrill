need :partition_labels

tc 'partition_labels("ababcbacadefegdehijhklij")', [9, 7, 8], partition_labels("ababcbacadefegdehijhklij")
tc 'partition_labels("eccbbbbdec")', [10], partition_labels("eccbbbbdec")
tc 'partition_labels("a")', [1], partition_labels("a")
tc 'partition_labels("")', [], partition_labels("")
tc 'partition_labels("abc")', [1, 1, 1], partition_labels("abc")
