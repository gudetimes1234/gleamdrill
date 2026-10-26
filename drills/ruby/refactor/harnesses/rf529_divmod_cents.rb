need :split_cents

tc "split_cents(1234)", [12, 34], split_cents(1234)
tc "split_cents(5) -- under a dollar", [0, 5], split_cents(5)
tc "split_cents(0)", [0, 0], split_cents(0)
tc "split_cents(-150) -- floors, like / and %", [-2, 50], split_cents(-150)
uses(/\.divmod\b/, "divmod")
avoids(/[\/%*]\s*100/, "arithmetic by hand")
