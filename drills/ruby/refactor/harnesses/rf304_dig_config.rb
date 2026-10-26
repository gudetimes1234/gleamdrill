need :db_host

full = { database: { primary: { host: "db1", port: 5432 } } }
tc "db_host(full config)", "db1", db_host(full)
tc "db_host({ database: {} }) -- no primary", nil, db_host({ database: {} })
tc "db_host({}) -- no database", nil, db_host({})
uses(/\.dig\b/, "dig")
avoids(/&&|\bif\b|\bunless\b|&\./, "guarding each level")
