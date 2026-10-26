def by_duration(songs)
  songs.sort_by { |song| song[:seconds] }
end
