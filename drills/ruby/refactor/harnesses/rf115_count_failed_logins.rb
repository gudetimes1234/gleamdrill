need :failed_logins

log = [
  { user: "ada", ok: false },
  { user: "ada", ok: true },
  { user: "bob", ok: false },
  { user: "ada", ok: false }
]
tc 'failed_logins(log, "ada")', 2, failed_logins(log, "ada")
tc 'failed_logins(log, "eve") -- never logged in', 0, failed_logins(log, "eve")
tc 'failed_logins([], "ada")', 0, failed_logins([], "ada")
uses(/\.count\s*(\{|do\b)/, "count with a block")
avoids(/\bwhile\b/, "while loop")
avoids(/\+=/, "manual counter")
