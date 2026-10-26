need :all_paid?

tc "all_paid?([{ paid: true }, { paid: true }])", true, all_paid?([{ paid: true }, { paid: true }])
tc "all_paid?([{ paid: true }, { paid: false }])", false, all_paid?([{ paid: true }, { paid: false }])
tc "all_paid?([]) -- vacuously true", true, all_paid?([])
uses(/\.all\?/, "all?")
avoids(/\.each\b/, "each loop")
avoids(/=\s*(true|false)\b/, "a flag variable")
