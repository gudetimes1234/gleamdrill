def run_command(cmd)
  if cmd[0] == :move && cmd.size == 3
    "move by #{cmd[1]},#{cmd[2]}"
  elsif cmd[0] == :say && cmd.size == 2
    "say #{cmd[1]}"
  elsif cmd == [:quit]
    "bye"
  else
    "unknown command"
  end
end
