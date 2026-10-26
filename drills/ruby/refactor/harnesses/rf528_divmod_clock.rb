need :clock

tc "clock(135)", "2:15", clock(135)
tc "clock(0) -- midnight", "0:00", clock(0)
tc "clock(59)", "0:59", clock(59)
tc "clock(60) -- exactly an hour", "1:00", clock(60)
uses(/\.divmod\b/, "divmod")
avoids(/%\s*60|\/\s*60/, "/ and % by hand")
