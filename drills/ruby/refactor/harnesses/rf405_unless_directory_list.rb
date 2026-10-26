need :ensure_dir

tc 'ensure_dir(["/var", "/tmp"], "/etc")', ["/etc", "/tmp", "/var"], ensure_dir(["/var", "/tmp"], "/etc")
tc 'ensure_dir(["/tmp"], "/tmp") -- already there', ["/tmp"], ensure_dir(["/tmp"], "/tmp")
tc 'ensure_dir([], "/home")', ["/home"], ensure_dir([], "/home")
uses(/\bunless\b/, "unless")
avoids(/\bif\s*(!|not\b)/, "if !")
avoids(/\belse\b/, "else")
