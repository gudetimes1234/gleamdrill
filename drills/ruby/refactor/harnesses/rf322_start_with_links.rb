need :link_kind

tc 'link_kind("https://gleamdrill.com")', "secure", link_kind("https://gleamdrill.com")
tc 'link_kind("http://example.com")', "plain", link_kind("http://example.com")
tc 'link_kind("ftp://https://x") -- only the front counts', "other", link_kind("ftp://https://x")
tc 'link_kind("")', "other", link_kind("")
uses(/\.start_with\?/, "start_with?")
avoids(/\[\s*0\s*(,|\.\.)/, "slicing the front and comparing")
