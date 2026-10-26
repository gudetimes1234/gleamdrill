def rolls_seen(rolls)
  groups = rolls.group_by { |roll| roll }
  groups.map { |face, same| [face, same.size] }.to_h
end
