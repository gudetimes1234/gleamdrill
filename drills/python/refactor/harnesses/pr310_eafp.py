need("port_for")
cfg = {"servers": {"web": {"port": 80}, "db": {"host": "x"}}}
tc("port_for(cfg, 'web')", 80, port_for(cfg, "web"))
tc("port_for(cfg, 'db') -- no port key", 8080, port_for(cfg, "db"))
tc("port_for(cfg, 'cache') -- no such server", 8080, port_for(cfg, "cache"))
tc("port_for({}, 'web') -- no servers at all", 8080, port_for({}, "web"))
uses(r"\bexcept\s+(\(?\s*)?KeyError\b", "except KeyError")
avoids(r"\bif\b.*\bin\b", "checking keys with in first")
