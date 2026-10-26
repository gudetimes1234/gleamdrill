need :size_index

tc "size_index(:small)", 0, size_index(:small)
tc "size_index(:x_large)", 3, size_index(:x_large)
tc "size_index(:huge) -- not a size", nil, size_index(:huge)
tc 'size_index("small") -- a string is not a symbol', nil, size_index("small")
uses(/%i[\[({<]/, "%i[]")
avoids(/\[\s*:\w+\s*,/, "an array of :symbols")
