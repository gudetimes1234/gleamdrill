need :present_fields

tc 'present_fields({ name: "Ada", email: nil, admin: false })', { name: "Ada", admin: false }, present_fields({ name: "Ada", email: nil, admin: false })
tc "present_fields({ email: nil }) -- every value missing", {}, present_fields({ email: nil })
tc "present_fields({})", {}, present_fields({})
uses(/\.compact\b/, "compact")
avoids(/\.each\b|\.(reject|select|filter)\b/, "filtering by hand")
avoids(/\bnil\b/, "a nil check")
