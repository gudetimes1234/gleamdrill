need :first_per_day

readings = [{ day: "mon", temp: 8 }, { day: "mon", temp: 11 }, { day: "tue", temp: 9 }]
tc "first_per_day(readings)", [{ day: "mon", temp: 8 }, { day: "tue", temp: 9 }], first_per_day(readings)
tc "first_per_day([])", [], first_per_day([])
tc "first_per_day([one])", [{ day: "sun", temp: 0 }], first_per_day([{ day: "sun", temp: 0 }])
uses(/\.uniq\s*(\{|do|\(&)/, "uniq with a block")
avoids(/\b(true|false)\b/, "a found flag")
avoids(/\.each\b/, "nested each loops")
