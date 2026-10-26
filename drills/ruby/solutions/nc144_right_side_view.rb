def right_side_view(root)
  # The last value on each level, which is what "seen from the right" means
  # once the question is asked level by level. Walking down the right children
  # alone is the tempting wrong answer: where the right side is short, a node
  # further left is the one that shows.
  seen = []
  frontier = [root].compact
  until frontier.empty?
    seen << frontier.last.val
    frontier = frontier.flat_map { |node| [node.left, node.right] }.compact
  end
  seen
end
