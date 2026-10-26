need :index_by_letter

tc 'index_by_letter(["ant", "bee", "asp"])', { "a" => ["ant", "asp"], "b" => ["bee"] }, index_by_letter(["ant", "bee", "asp"])
tc "index_by_letter([])", {}, index_by_letter([])
tc 'index_by_letter(["cat"])', { "c" => ["cat"] }, index_by_letter(["cat"])
uses(/\|\|=/, "||=")
avoids(/key\?|\.nil\?|\bif\b/, "check-then-create")
