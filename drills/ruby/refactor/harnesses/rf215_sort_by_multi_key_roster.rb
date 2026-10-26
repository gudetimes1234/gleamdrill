need :roster

staff = [{ dept: "ops", name: "Zed" }, { dept: "dev", name: "Mia" }, { dept: "ops", name: "Abe" }, { dept: "dev", name: "Kai" }]
tc "roster(staff)", %w[dev/Kai dev/Mia ops/Abe ops/Zed], roster(staff).map { |e| "#{e[:dept]}/#{e[:name]}" }
tc "roster([])", [], roster([])
tc "roster([one]) -- one person", [{ dept: "hr", name: "Lu" }], roster([{ dept: "hr", name: "Lu" }])
uses(/\.sort_by\b/, "sort_by")
avoids(/<=>/, "the spaceship operator")
avoids(/\bif\b|\?.*:/, "a tie-break branch")
