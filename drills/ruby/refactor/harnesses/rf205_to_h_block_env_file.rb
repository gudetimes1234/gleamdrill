need :parse_env

tc 'parse_env(["PORT=80", "HOST=local"])', { "PORT" => "80", "HOST" => "local" }, parse_env(["PORT=80", "HOST=local"])
tc "parse_env([])", {}, parse_env([])
tc 'parse_env(["URL=a=b"]) -- only the first = splits', { "URL" => "a=b" }, parse_env(["URL=a=b"])
uses(/\.to_h\s*(\{|do)/, "to_h with a block")
avoids(/\bwhile\b/, "while loop")
avoids(/\[i\]/, "indexing by position")
