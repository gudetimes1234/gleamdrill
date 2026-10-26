def merge_tags(old_tags, new_tags)
  merged = {}
  old_tags.each { |post, tags| merged[post] = tags }
  new_tags.each do |post, tags|
    merged[post] = merged[post] ? (merged[post] + tags).uniq : tags
  end
  merged
end
