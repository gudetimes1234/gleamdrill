need :digits_only

tc 'digits_only("(555) 123-4567")', "5551234567", digits_only("(555) 123-4567")
tc 'digits_only("+1 800 FLOWERS")', "1800", digits_only("+1 800 FLOWERS")
tc 'digits_only("")', "", digits_only("")
uses(/\.delete\b|\.tr\b/, "delete")
avoids(/each_char|\.chars\b|\+=/, "a character loop")
