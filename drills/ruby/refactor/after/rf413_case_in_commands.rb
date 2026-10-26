def run_command(cmd)
  case cmd
  in [:move, dx, dy] then "move by #{dx},#{dy}"
  in [:say, text] then "say #{text}"
  in [:quit] then "bye"
  else "unknown command"
  end
end
