need :opening_streak

tc "opening_streak([:win, :win, :loss, :win])", 2, opening_streak([:win, :win, :loss, :win])
tc "opening_streak([:loss, :win])", 0, opening_streak([:loss, :win])
tc "opening_streak([])", 0, opening_streak([])
tc "opening_streak([:win] * 3)", 3, opening_streak([:win] * 3)
uses(/\.take_while\b/, "take_while")
avoids(/\bfor\b/, "for loop")
avoids(/\bbreak\b|\+=/, "counting until break")
