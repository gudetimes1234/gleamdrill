need :rgb, :to_hex, :grayscale?

tc "to_hex(rgb(255, 0, 128))", "#ff0080", to_hex(rgb(255, 0, 128))
tc "to_hex(rgb(0, 0, 0)) -- black", "#000000", to_hex(rgb(0, 0, 0))
tc "grayscale?(rgb(9, 9, 9))", true, grayscale?(rgb(9, 9, 9))
tc "grayscale?(rgb(1, 2, 3))", false, grayscale?(rgb(1, 2, 3))
tc "style: rgb(1, 2, 3).green -- a named field", 2, (rgb(1, 2, 3).green rescue :no_reader)
uses(/Struct\.new|Data\.define/, "Struct or Data.define")
avoids(/\[[0-2]\]/, "positional indexes")
