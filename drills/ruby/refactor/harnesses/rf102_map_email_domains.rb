need :email_domains

tc 'email_domains(["ada@Example.com", "bob@ruby.org"])', ["example.com", "ruby.org"], email_domains(["ada@Example.com", "bob@ruby.org"])
tc "email_domains([])", [], email_domains([])
tc 'email_domains(["a@x.io", "b@x.io"]) -- duplicates stay', ["x.io", "x.io"], email_domains(["a@x.io", "b@x.io"])
uses(/\.(map|collect)\b/, "map")
avoids(/\bfor\b/, "for loop")
avoids(/<<|\.push\b/, "pushing into an accumulator")
