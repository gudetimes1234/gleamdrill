need :first_overdue

a = { id: 1, days_late: 0 }
b = { id: 2, days_late: 12 }
c = { id: 3, days_late: 3 }
tc "first_overdue([a(0), b(12), c(3)]) -- the first, not the worst", b, first_overdue([a, b, c])
tc "first_overdue([a(0)]) -- none late", nil, first_overdue([a])
tc "first_overdue([])", nil, first_overdue([])
uses(/\.(find|detect)\b/, "find")
avoids(/\.each\b/, "each loop")
avoids(/\.nil\?|=\s*nil\b/, "a found variable")
