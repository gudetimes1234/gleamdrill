need :active_emails

users = [
  { email: "a@x.io", active: true },
  { email: "b@x.io", active: false },
  { email: "c@x.io", active: true },
]
tc "active_emails(users)", ["a@x.io", "c@x.io"], active_emails(users)
tc "active_emails([])", [], active_emails([])
tc "active_emails -- nobody active", [], active_emails([{ email: "z@x.io", active: false }])
uses(/\.filter_map\b/, "filter_map")
avoids(/\.(select|filter)\b/, "select then map")
