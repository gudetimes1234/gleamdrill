need :shout_tags

tc 'shout_tags("love #ruby and #gleam")', "love #RUBY and #GLEAM", shout_tags("love #ruby and #gleam")
tc 'shout_tags("no tags here")', "no tags here", shout_tags("no tags here")
tc 'shout_tags("")', "", shout_tags("")
uses(/\.gsub\b/, "gsub")
avoids(/\.split\b|\.join\b/, "split and join")
avoids(/\bif\b/, "if")
