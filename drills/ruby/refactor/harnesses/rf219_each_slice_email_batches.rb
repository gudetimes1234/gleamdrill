need :batches

mails = %w[a@x b@x c@x d@x e@x]
tc "batches(mails, 2) -- the last batch is short", [%w[a@x b@x], %w[c@x d@x], %w[e@x]], batches(mails, 2)
tc "batches([], 3)", [], batches([], 3)
tc "batches(mails, 10)", [mails], batches(mails, 10)
uses(/\.each_slice\b/, "each_slice")
avoids(/\bwhile\b/, "while loop")
avoids(/\+=/, "stepping an offset")
