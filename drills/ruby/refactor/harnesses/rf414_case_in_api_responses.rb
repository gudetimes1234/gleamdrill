need :summarize

tc 'summarize({ status: "ok", data: [1, 2] })', "got 2 records", summarize({ status: "ok", data: [1, 2] })
tc 'summarize({ status: "error", message: "timeout" })', "failed: timeout", summarize({ status: "error", message: "timeout" })
tc 'summarize({ status: "ok" }) -- no data key', "bad response", summarize({ status: "ok" })
tc 'summarize({ status: "ok", data: [], extra: 1 }) -- extra keys are fine', "got 0 records", summarize({ status: "ok", data: [], extra: 1 })
uses(/\bin\s*(\{|\w+:)/, "case/in with a hash pattern")
avoids(/key\?|has_key\?/, "key? checks")
avoids(/response\[/, "response[...] lookups")
