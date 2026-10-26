need :overdue?

require "date"
due = Date.new(2026, 3, 1)
tc "overdue?(unpaid, after due)", true, overdue?({ paid: false, due: due }, Date.new(2026, 3, 2))
tc "overdue?(unpaid, on the due day)", false, overdue?({ paid: false, due: due }, due)
tc "overdue?(paid, after due)", false, overdue?({ paid: true, due: due }, Date.new(2026, 4, 1))
avoids(/\?\s*true\s*:\s*false/, "? true : false")
avoids(/\btrue\b|\bfalse\b/, "true/false literals")
