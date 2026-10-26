need :split_emails

tc 'split_emails(["ada@x.io", "nope", "bob@y.org"])', [["ada@x.io", "bob@y.org"], ["nope"]], split_emails(["ada@x.io", "nope", "bob@y.org"])
tc 'split_emails(["a@b"]) -- all valid', [["a@b"], []], split_emails(["a@b"])
tc "split_emails([])", [[], []], split_emails([])
uses(/\.partition\b/, "partition")
avoids(/\bwhile\b/, "while loop")
avoids(/<<|\.push\b/, "pushing into two arrays")
