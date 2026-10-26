need :adult?, :even_and_positive?

tc "adult?(18)", true, adult?(18)
tc "adult?(17)", false, adult?(17)
tc "even_and_positive?(4)", true, even_and_positive?(4)
tc "even_and_positive?(-2)", false, even_and_positive?(-2)
tc "even_and_positive?(3)", false, even_and_positive?(3)
avoids(/\btrue\b|\bfalse\b/, "true/false literals")
avoids(/\breturn\b/, "explicit return")
avoids(/\bif\b/, "if around a boolean")
