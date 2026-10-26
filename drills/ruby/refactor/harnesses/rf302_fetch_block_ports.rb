need :port_for

ports = { "web" => 3000 }
tc 'port_for({ "web" => 3000 }, "web")', 3000, port_for(ports, "web")
tc 'port_for({ "web" => 3000 }, "api") -- 8000 + name length', 8003, port_for(ports, "api")
tc 'port_for({}, "") -- empty name', 8000, port_for({}, "")
uses(/\.fetch\s*\(\s*\w+\s*\)\s*(\{|do\b)/, "fetch with a block")
avoids(/\.nil\?|\bif\b|\bunless\b|\|\|/, "nil checks")
