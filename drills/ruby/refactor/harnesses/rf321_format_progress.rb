need :progress

tc "progress(3, 10)", "Step 03 of 10 (30%)", progress(3, 10)
tc "progress(0, 4) -- zero is padded too", "Step 00 of 4 (0%)", progress(0, 4)
tc "progress(12, 12) -- two digits need no pad", "Step 12 of 12 (100%)", progress(12, 12)
uses(/%0\d+d|\.rjust\(\s*\d+\s*,\s*["']0["']\s*\)/, "zero padding (%02d)")
avoids(/"\s*\+|\+\s*"/, "string +")
avoids(/\.to_s\b/, "to_s")
