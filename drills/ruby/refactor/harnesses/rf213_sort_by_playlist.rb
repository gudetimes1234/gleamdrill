need :by_duration

songs = [{ title: "Long", seconds: 420 }, { title: "Short", seconds: 95 }, { title: "Mid", seconds: 200 }]
tc "by_duration(songs)", %w[Short Mid Long], by_duration(songs).map { |song| song[:title] }
tc "by_duration([])", [], by_duration([])
tc "by_duration(songs) -- leaves the input alone", "Long", (by_duration(songs); songs.first[:title])
uses(/\.sort_by\b/, "sort_by")
avoids(/<=>/, "the spaceship operator")
avoids(/\.sort\s*(\{|do)/, "sort with a comparison block")
