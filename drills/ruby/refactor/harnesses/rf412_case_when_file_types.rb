need :file_kind

tc 'file_kind("cat.PNG")', "image", file_kind("cat.PNG")
tc 'file_kind("trip.mov")', "video", file_kind("trip.mov")
tc 'file_kind("README.md")', "text", file_kind("README.md")
tc 'file_kind("Makefile") -- no extension', "other", file_kind("Makefile")
uses(/\bwhen\b[^\n]*(,|\*)/, "when with a list")
avoids(/include\?|==/, "include? / == comparisons")
avoids(/\belsif\b/, "elsif")
