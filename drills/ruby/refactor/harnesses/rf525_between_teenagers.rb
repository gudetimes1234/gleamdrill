need :teenager?

tc "teenager?(15)", true, teenager?(15)
tc "teenager?(13) -- first teen year", true, teenager?(13)
tc "teenager?(19) -- last teen year", true, teenager?(19)
tc "teenager?(12)", false, teenager?(12)
tc "teenager?(20)", false, teenager?(20)
uses(/\.between\?|\.cover\?/, "between?")
avoids(/\breturn\b|[<>]/, "guard comparisons")
