need :india_offices

csv = "office, country, telephone\nChicago, USA, +1 312 373 1000\nBeijing, China, +86 4008 900 505\n\nBangalore, India, +91 80 4064 9570\nPune, India, +91 20 6660 4000\n"
tc "india_offices(csv)", [{ city: "Bangalore", phone: "+91 80 4064 9570" }, { city: "Pune", phone: "+91 20 6660 4000" }], india_offices(csv)
tc "india_offices(header only)", [], india_offices("office, country, telephone\n")
uses(/\.(select|filter)\b/, "select")
uses(/\.map\b/, "map")
avoids(/\.each\b/, "each loop")
avoids(/\bnext\b|<</, "next / push inside a loop")
