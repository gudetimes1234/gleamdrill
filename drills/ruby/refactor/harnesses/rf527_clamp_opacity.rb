need :opacity

tc "opacity(0.5)", 0.5, opacity(0.5)
tc "opacity(-0.2) -- below zero", 0.0, opacity(-0.2)
tc "opacity(1.7) -- above one", 1.0, opacity(1.7)
tc "opacity(1.0)", 1.0, opacity(1.0)
uses(/\.clamp\b/, "clamp")
avoids(/\.(min|max)\b/, "min and max")
