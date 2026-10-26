need :pay_amount

tc "pay_amount(dead)", 0, pay_amount({ dead: true, salary: 9 })
tc "pay_amount(separated)", 100, pay_amount({ separated: true, salary: 9 })
tc "pay_amount(retired)", 200, pay_amount({ retired: true, salary: 9 })
tc "pay_amount(working)", 9, pay_amount({ salary: 9 })
tc "pay_amount(dead and retired) -- dead wins", 0, pay_amount({ dead: true, retired: true })
uses(/return .+ if /, "guard clauses (return ... if ...)")
avoids(/\belse\b/, "else")
avoids(/\bresult\b/, "result variable")
