need :owing_report

report = "***********************\n**** Customer Owes ****\n***********************\nname: Ann\namount: 7"
tc "owing_report(\"Ann\", orders)", report, owing_report("Ann", [{ amount: 3 }, { amount: 4 }])
tc "owing_report -- no orders owe 0", true, owing_report("Bo", []).end_with?("amount: 0")
tc "style: banner, total and details are methods", true, Drill.code.scan(/\bdef /).length >= 4
avoids(/\+=/, "running total")
