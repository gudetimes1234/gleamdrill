need :public_profile

user = { name: "Ann", email: "ann@x.io", password: "hunter2", admin: true }
tc "public_profile(user)", { name: "Ann", email: "ann@x.io" }, public_profile(user)
tc 'public_profile({ name: "Bo" }) -- a missing key stays missing', { name: "Bo" }, public_profile({ name: "Bo" })
tc "public_profile({})", {}, public_profile({})
uses(/\.slice\b/, "slice")
avoids(/\.each\b|\.select\b|\.filter\b|key\?/, "picking keys by hand")
