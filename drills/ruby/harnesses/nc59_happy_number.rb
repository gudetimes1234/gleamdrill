need :is_happy

tc "is_happy(19)", true, is_happy(19)
tc "is_happy(2)", false, is_happy(2)
tc "is_happy(1)", true, is_happy(1)
tc "is_happy(7)", true, is_happy(7)
tc "is_happy(4)", false, is_happy(4)
tc "is_happy(100)", true, is_happy(100)
