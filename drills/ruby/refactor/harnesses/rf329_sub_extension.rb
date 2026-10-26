need :with_extension

tc 'with_extension("notes.txt", "md")', "notes.md", with_extension("notes.txt", "md")
tc 'with_extension("archive.tar.gz", "zip") -- only the last one', "archive.tar.zip", with_extension("archive.tar.gz", "zip")
tc 'with_extension("README", "md") -- none to replace', "README.md", with_extension("README", "md")
uses(/\.sub\b/, "sub")
avoids(/rindex|\bindex\b|\[\s*0\s*\.\./, "slicing at an index")
avoids(/\.gsub\b/, "gsub (there is one ending, so sub)")
