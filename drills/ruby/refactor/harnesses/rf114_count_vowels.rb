need :vowel_count

tc 'vowel_count("Ruby is Great")', 4, vowel_count("Ruby is Great")
tc 'vowel_count("rhythm") -- no vowels', 0, vowel_count("rhythm")
tc 'vowel_count("")', 0, vowel_count("")
tc 'vowel_count("AEIOU") -- upper case counts too', 5, vowel_count("AEIOU")
uses(/\.count\b/, "count")
avoids(/\.(select|filter)\b/, "select")
avoids(/\.(length|size)\b/, "measuring a filtered array")
