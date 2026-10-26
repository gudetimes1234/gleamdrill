need :numbers_in

tc 'numbers_in("3 apples and 12 pears")', [3, 12], numbers_in("3 apples and 12 pears")
tc 'numbers_in("room 101") -- a number at the end', [101], numbers_in("room 101")
tc 'numbers_in("none")', [], numbers_in("none")
uses(/\.scan\b/, "scan")
avoids(/each_char|\.chars\b/, "a character loop")
