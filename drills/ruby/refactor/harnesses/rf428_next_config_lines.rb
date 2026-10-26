need :settings_lines

tc 'settings_lines(["a=1", "", "# note", " b=2 "])', ["a=1", "b=2"], settings_lines(["a=1", "", "# note", " b=2 "])
tc "settings_lines([])", [], settings_lines([])
tc 'settings_lines(["   ", "#x"]) -- only noise', [], settings_lines(["   ", "#x"])
uses(/\bnext\b/, "next")
avoids(/\bif\s*!|\bunless\b[^\n]*\n[^\n]*\b(if|unless)\b/, "nested negated ifs")
