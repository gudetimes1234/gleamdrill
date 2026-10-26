need :score

tc 'score(%w[a c b d], %w[a b b d])', 3, score(%w[a c b d], %w[a b b d])
tc "score([], [])", 0, score([], [])
tc 'score(%w[a], %w[b])', 0, score(%w[a], %w[b])
uses(/\.zip\b/, "zip")
avoids(/\[i\]/, "indexing both arrays")
avoids(/\+=/, "a running counter")
