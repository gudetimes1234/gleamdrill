need :plumage

tc "plumage(european)", "average", plumage({ type: "european" })
tc "plumage(african with 3 coconuts)", "tired", plumage({ type: "african", coconuts: 3 })
tc "plumage(african with 1)", "average", plumage({ type: "african", coconuts: 1 })
tc "plumage(parrot at 200 volts)", "scorched", plumage({ type: "norwegian_blue", voltage: 200 })
tc "plumage(parrot at 0 volts)", "beautiful", plumage({ type: "norwegian_blue", voltage: 0 })
tc "plumage(dodo)", "unknown", plumage({ type: "dodo" })
tc "style: each kind of bird has its own plumage", true, Drill.code.scan(/def plumage\b/).length >= 4
uses(/class \w+ < \w+/, "subclasses")
