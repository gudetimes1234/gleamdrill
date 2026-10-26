need :before_first_error

log = ["boot", "ready", "ERROR disk", "retry", "ERROR again"]
tc "before_first_error(log)", %w[boot ready], before_first_error(log)
tc 'before_first_error(["ok", "fine"]) -- no error keeps all', %w[ok fine], before_first_error(%w[ok fine])
tc "before_first_error([])", [], before_first_error([])
tc 'before_first_error(["ERROR first"])', [], before_first_error(["ERROR first"])
uses(/\.take_while\b/, "take_while")
avoids(/\bbreak\b/, "break")
avoids(/\.each\b/, "each loop")
