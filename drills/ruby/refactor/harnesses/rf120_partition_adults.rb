need :adults_and_minors

Member = Struct.new(:name, :age)
ada = Member.new("Ada", 36)
kim = Member.new("Kim", 17)
lee = Member.new("Lee", 18)
tc "adults_and_minors([ada 36, kim 17, lee 18])", [[ada, lee], [kim]], adults_and_minors([ada, kim, lee])
tc "adults_and_minors([kim 17]) -- no adults", [[], [kim]], adults_and_minors([kim])
tc "adults_and_minors([])", [[], []], adults_and_minors([])
uses(/\.partition\b/, "partition")
avoids(/\.(select|filter|reject)\b/, "select plus reject")
