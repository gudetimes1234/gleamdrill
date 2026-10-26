need :grade

tc "grade(100)", "A", grade(100)
tc "grade(90) -- boundary", "A", grade(90)
tc "grade(89)", "B", grade(89)
tc "grade(70)", "C", grade(70)
tc "grade(0)", "F", grade(0)
uses(/\bwhen\b[^\n]*\.\./, "when with a range")
avoids(/\belsif\b/, "elsif")
avoids(/>=|<=/, ">= comparisons")
