def by_duration(songs)
  songs.sort { |a, b| a[:seconds] <=> b[:seconds] }
end
