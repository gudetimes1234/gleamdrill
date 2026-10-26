need :run_command

tc "run_command([:move, 2, -1])", "move by 2,-1", run_command([:move, 2, -1])
tc 'run_command([:say, "hi"])', "say hi", run_command([:say, "hi"])
tc "run_command([:quit])", "bye", run_command([:quit])
tc "run_command([:move, 1]) -- wrong arity", "unknown command", run_command([:move, 1])
tc "run_command([])", "unknown command", run_command([])
uses(/\bin\s*\[/, "case/in with an array pattern")
avoids(/\[\d\]/, "indexing like cmd[0]")
avoids(/\.(size|length|count)\b/, "size checks")
