need :without_stop_words

tc 'without_stop_words("the wind of change")', "wind change", without_stop_words("the wind of change")
tc 'without_stop_words("an apple a day")', "apple day", without_stop_words("an apple a day")
tc 'without_stop_words("") -- empty', "", without_stop_words("")
tc 'without_stop_words("The end") -- case matters', "The end", without_stop_words("The end")
uses(/%w[\[({<]/, "%w[]")
avoids(/\[\s*["']/, "an array of quoted strings")
