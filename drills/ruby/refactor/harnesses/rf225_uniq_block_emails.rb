need :unique_emails

tc 'unique_emails(["Ann@x.io", "bo@x.io", "ann@X.io"]) -- keeps the first spelling', ["Ann@x.io", "bo@x.io"], unique_emails(["Ann@x.io", "bo@x.io", "ann@X.io"])
tc "unique_emails([])", [], unique_emails([])
tc 'unique_emails(["a@b"])', ["a@b"], unique_emails(["a@b"])
uses(/\.uniq\s*(\{|do|\(&)/, "uniq with a block")
avoids(/include\?/, "include? on a seen list")
avoids(/\.each\b/, "each loop")
