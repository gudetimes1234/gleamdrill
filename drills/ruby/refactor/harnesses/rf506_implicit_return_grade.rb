need :letter_grade

tc "letter_grade(95)", "A", letter_grade(95)
tc "letter_grade(80) -- on the boundary", "B", letter_grade(80)
tc "letter_grade(70)", "C", letter_grade(70)
tc "letter_grade(0)", "F", letter_grade(0)
uses(/^\s*"[A-F]"\s*$|\bthen\s+"[A-F]"|\belse\s+"[A-F]"|\?\s*"[A-F]"/, "bare branch values")
avoids(/\breturn\b/, "return")
