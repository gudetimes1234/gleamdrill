need :search

tc "search([4, 5, 6, 7, 0, 1, 2], 0)", 4, search([4, 5, 6, 7, 0, 1, 2], 0)
tc "search([4, 5, 6, 7, 0, 1, 2], 3)", -1, search([4, 5, 6, 7, 0, 1, 2], 3)
tc "search([1], 1)", 0, search([1], 1)
tc "search([4, 5, 6, 7, 0, 1, 2], 6)", 2, search([4, 5, 6, 7, 0, 1, 2], 6)
