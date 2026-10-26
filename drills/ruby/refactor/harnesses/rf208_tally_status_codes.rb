need :status_summary

log = ["GET / 200", "GET /x 404", "POST /login 200"]
tc "status_summary(log)", { "200" => 2, "404" => 1 }, status_summary(log)
tc "status_summary([])", {}, status_summary([])
tc 'status_summary(["GET /boom 500"])', { "500" => 1 }, status_summary(["GET /boom 500"])
uses(/\.tally\b/, "tally")
avoids(/Hash\.new/, "Hash.new(0) counter")
avoids(/\bwhile\b/, "while loop")
