need :redact

request = { path: "/login", password: "hunter2", token: "abc", ip: "1.2.3.4" }
tc "redact(request)", { path: "/login", ip: "1.2.3.4" }, redact(request)
tc "redact(request) leaves request alone", 4, (redact(request); request.size)
tc 'redact({ path: "/" }) -- nothing to drop', { path: "/" }, redact({ path: "/" })
uses(/\.except\b/, "except")
avoids(/\.delete\b|\.dup\b|\.reject\b/, "copy then delete")
