need :stock_of

shelf = { apples: 4, pears: 0 }
tc "stock_of(shelf, :apples)", 4, stock_of(shelf, :apples)
tc "stock_of(shelf, :pears) -- zero is still stocked", 0, stock_of(shelf, :pears)
missing = begin
  stock_of(shelf, :kiwis)
rescue ArgumentError => error
  error.message
end
tc "stock_of(shelf, :kiwis) -- raises ArgumentError", "unknown item: kiwis", missing
uses(/\.fetch\s*\(\s*\w+\s*\)\s*(\{|do\b)/, "fetch with a block")
avoids(/include\?|key\?|member\?|\bunless\b|\bif\b/, "checking the key first")
