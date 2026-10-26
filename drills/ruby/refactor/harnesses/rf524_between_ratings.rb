need :valid_rating?

tc "valid_rating?(3)", true, valid_rating?(3)
tc "valid_rating?(1) -- ends are included", true, valid_rating?(1)
tc "valid_rating?(5)", true, valid_rating?(5)
tc "valid_rating?(0)", false, valid_rating?(0)
tc "valid_rating?(6)", false, valid_rating?(6)
uses(/\.between\?|\.cover\?/, "between?")
avoids(/&&|\band\b/, "two comparisons joined by &&")
