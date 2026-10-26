need :total_size

Upload = Struct.new(:name, :size)
tc 'total_size([cat.png 2048, notes.txt 512])', 2560, total_size([Upload.new("cat.png", 2048), Upload.new("notes.txt", 512)])
tc 'total_size([empty.txt 0])', 0, total_size([Upload.new("empty.txt", 0)])
tc "total_size([])", 0, total_size([])
uses(/\.sum\b/, "sum")
avoids(/\bwhile\b/, "while loop")
avoids(/\+=|=\s*\w+\s*\+/, "running total")
