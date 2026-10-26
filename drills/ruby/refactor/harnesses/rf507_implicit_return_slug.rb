need :slugify

tc 'slugify("Hello World")', "hello-world", slugify("Hello World")
tc 'slugify("  Ruby  ") -- trimmed', "ruby", slugify("  Ruby  ")
tc 'slugify("") -- empty', "", slugify("")
uses(/^\s*title\.\w+/, "the expression as the last line")
avoids(/\breturn\b/, "return")
avoids(/^\s*\w+\s*=[^=]/, "a temp variable")
