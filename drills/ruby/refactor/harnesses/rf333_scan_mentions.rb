need :mentions

tc 'mentions("thanks @ann and @bo")', ["ann", "bo"], mentions("thanks @ann and @bo")
tc 'mentions("@cy")', ["cy"], mentions("@cy")
tc 'mentions("lunch @ noon") -- a lone @ is no one', [], mentions("lunch @ noon")
tc 'mentions("")', [], mentions("")
uses(/\.scan\b/, "scan")
avoids(/\.split\b|\.each\b/, "split and each")
