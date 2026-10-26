need :Parcel

light = Parcel.new(1.5)
heavy = Parcel.new(20)
tc "light < heavy", true, light < heavy
tc "heavy >= light", true, heavy >= light
tc "light <= Parcel.new(1.5) -- equal weight", true, light <= Parcel.new(1.5)
tc "light > heavy", false, light > heavy
tc "style: Parcel.new(5).between?(light, heavy)", true, (Parcel.new(5).between?(light, heavy) rescue :not_comparable)
uses(/def\s+<=>/, "<=>")
avoids(/def\s+(<|>|<=|>=)\s*\(/, "hand-written comparison operators")
