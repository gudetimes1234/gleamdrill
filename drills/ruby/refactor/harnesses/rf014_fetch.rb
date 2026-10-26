need :timeout

tc "timeout({ timeout: 5 })", 5, timeout({ timeout: 5 })
tc "timeout({}) -- the default", 30, timeout({})
tc "timeout({ timeout: nil }) -- present, so nil", nil, timeout({ timeout: nil })
uses(/\.fetch\b/, "fetch")
avoids(/has_key\?|key\?|\?\s*config\[/, "check-then-read")
