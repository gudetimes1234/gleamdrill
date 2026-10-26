need :disability_amount

base = { seniority: 5, months_disabled: 2, part_time: false, salary: 500 }
tc "disability_amount(eligible)", 50, disability_amount(base)
tc "disability_amount(new starter)", 0, disability_amount(base.merge(seniority: 1))
tc "disability_amount(long disability)", 0, disability_amount(base.merge(months_disabled: 13))
tc "disability_amount(part time)", 0, disability_amount(base.merge(part_time: true))
tc "style: one guard for all three", 1, Drill.code.scan(/return 0/).length
uses(/\|\||\bor\b/, "the checks joined with ||")
