need :countdown

tc "countdown(3)", ["3...", "2...", "1...", "liftoff"], countdown(3)
tc "countdown(1)", ["1...", "liftoff"], countdown(1)
tc "countdown(0) -- straight to liftoff", ["liftoff"], countdown(0)
uses(/\.downto\b|\.step\b|\.reverse_each\b/, "downto")
avoids(/\bwhile\b|\buntil\b/, "while loop")
avoids(/-=/, "manual decrement")
