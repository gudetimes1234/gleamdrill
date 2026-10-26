need :notify

tc 'notify({ email: "a@x.io" }, [])', ["mail to a@x.io"], notify({ email: "a@x.io" }, [])
tc 'notify({ email: "b@x.io", opted_out: true }, [])', [], notify({ email: "b@x.io", opted_out: true }, [])
tc 'notify({ email: "c@x.io", opted_out: false }, ["old"])', ["old", "mail to c@x.io"], notify({ email: "c@x.io", opted_out: false }, ["old"])
uses(/[^=\s(][ \t]+unless\b/, "a modifier unless")
avoids(/^[ \t]*(unless|if)\b/, "unless ... end block")
avoids(/\bif\s*!/, "if !")
