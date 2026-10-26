need :with_defaults

tc "with_defaults({})", { color: "blue", size: 10 }, with_defaults({})
tc "with_defaults({ color: \"red\" })", { color: "red", size: 10 }, with_defaults({ color: "red" })
tc "with_defaults({ size: 3, color: \"x\" })", { size: 3, color: "x" }, with_defaults({ size: 3, color: "x" })
uses(/\|\|=/, "||=")
avoids(/=\s*options\[/, "x = x || default")
