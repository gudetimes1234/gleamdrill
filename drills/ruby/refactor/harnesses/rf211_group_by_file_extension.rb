need :by_extension

files = %w[a.rb notes.txt b.rb Makefile]
tc "by_extension(files) -- no extension groups under \"\"", { ".rb" => %w[a.rb b.rb], ".txt" => %w[notes.txt], "" => %w[Makefile] }, by_extension(files)
tc "by_extension([])", {}, by_extension([])
tc 'by_extension(["x.tar.gz"]) -- only the last extension', { ".gz" => %w[x.tar.gz] }, by_extension(["x.tar.gz"])
uses(/\.group_by\b/, "group_by")
avoids(/\bwhile\b/, "while loop")
avoids(/key\?|\.push\b/, "creating and filling buckets by hand")
