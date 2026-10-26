need :slug

tc 'slug("Hello World")', "hello-world", slug("Hello World")
tc 'slug("Ruby  -  Tips") -- runs of dashes collapse', "ruby-tips", slug("Ruby  -  Tips")
tc 'slug("")', "", slug("")
uses(/\.squeeze\b/, "squeeze")
avoids(/\bwhile\b|\buntil\b|\bloop\b/, "a loop")
avoids(/\.gsub\b/, "gsub for a single character (tr)")
