need :make_point, :distance

tc "distance(make_point(0, 0), make_point(3, 4))", 5.0, distance(make_point(0, 0), make_point(3, 4))
tc "distance(p, p) -- same point", 0.0, distance(make_point(2, 2), make_point(2, 2))
tc "make_point(1, 2) == make_point(1, 2) -- compared by value", true, make_point(1, 2) == make_point(1, 2)
tc "style: make_point(1, 2).x -- a reader, not a key", 1, (make_point(1, 2).x rescue :no_reader)
uses(/Data\.define|Struct\.new/, "Data.define or Struct")
avoids(/\[:[xy]\]/, "hash lookups")
