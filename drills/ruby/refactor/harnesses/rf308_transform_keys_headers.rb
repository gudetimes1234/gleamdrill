need :normalize_headers

tc 'normalize_headers({ "Content-Type" => "text/html", "ACCEPT" => "*/*" })', { "content-type" => "text/html", "accept" => "*/*" }, normalize_headers({ "Content-Type" => "text/html", "ACCEPT" => "*/*" })
tc 'normalize_headers({ "Host" => "a", "HOST" => "b" }) -- clashing keys, last wins', { "host" => "b" }, normalize_headers({ "Host" => "a", "HOST" => "b" })
tc "normalize_headers({})", {}, normalize_headers({})
uses(/\.transform_keys\b/, "transform_keys")
avoids(/\.map\b|\.to_h\b|\.each\b/, "map to pairs and back")
