def level_order(root)
  # Take the whole frontier at once rather than one node at a time: everything
  # on it is the current level, and its children are the next. That is what
  # makes the grouping fall out without tracking any depth; a plain queue
  # would give the right order but no idea where each level ends.
  levels = []
  frontier = [root].compact
  until frontier.empty?
    levels << frontier.map(&:val)
    frontier = frontier.flat_map { |node| [node.left, node.right] }.compact
  end
  levels
end
