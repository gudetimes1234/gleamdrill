need :image_file?

tc 'image_file?("cat.PNG") -- case does not matter', true, image_file?("cat.PNG")
tc 'image_file?("notes.txt")', false, image_file?("notes.txt")
tc 'image_file?("a.gif")', true, image_file?("a.gif")
tc 'image_file?("png") -- no dot', false, image_file?("png")
uses(/\.end_with\?/, "end_with?")
avoids(/\[\s*-\d/, "slicing the end")
avoids(/\|\|/, "an || chain (end_with? takes several suffixes)")
