need :tag

tc 'tag("br") -- no attributes', "<br>", tag("br")
tc 'tag("a", href: "/home")', '<a href="/home">', tag("a", href: "/home")
tc 'tag("img", src: "x.png", alt: "x")', '<img src="x.png" alt="x">', tag("img", src: "x.png", alt: "x")
uses(/\*\*\w+/, "a double splat")
avoids(/=\s*\{\s*\}/, "a hash default")
