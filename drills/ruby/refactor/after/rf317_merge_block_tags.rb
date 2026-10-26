def merge_tags(old_tags, new_tags)
  old_tags.merge(new_tags) { |_post, older, newer| older | newer }
end
