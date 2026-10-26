need :rot13

tc 'rot13("Hello, World!")', "Uryyb, Jbeyq!", rot13("Hello, World!")
tc 'rot13(rot13("Ruby 3.4")) -- twice is the identity', "Ruby 3.4", rot13(rot13("Ruby 3.4"))
tc 'rot13("")', "", rot13("")
uses(/\.tr\b/, "tr")
avoids(/\.ord\b|\.chr\b/, "character arithmetic")
avoids(/\.chars\b|each_char/, "a character loop")
