need :strip_leading_comments

src = ["# header", "# more", "x = 1", "# inline note", "y = 2"]
tc "strip_leading_comments(src) -- later comments stay", ["x = 1", "# inline note", "y = 2"], strip_leading_comments(src)
tc "strip_leading_comments([])", [], strip_leading_comments([])
tc 'strip_leading_comments(["# only"]) -- all comments', [], strip_leading_comments(["# only"])
uses(/\.drop_while\b/, "drop_while")
avoids(/\bwhile\b/, "while loop")
avoids(/\[i\]|\+=/, "walking an index")
