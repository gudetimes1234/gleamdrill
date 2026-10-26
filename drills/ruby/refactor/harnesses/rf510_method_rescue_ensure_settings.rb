need :read_setting

log = []
tc 'read_setting({ "theme" => "dark" }, "theme", log)', "dark", read_setting({ "theme" => "dark" }, "theme", log)
tc 'read_setting({}, "font", log) -- missing', "default", read_setting({}, "font", log)
tc "log -- every read is logged", ["theme", "font"], log
uses(/^\s*rescue\b/, "rescue")
uses(/^\s*ensure\b/, "ensure")
avoids(/\bbegin\b/, "begin")
