need :Playlist

list = Playlist.new("Mix")
tc 'Playlist.new("Mix").title', "Mix", list.title
list.title = "Road trip"
tc 'title = "Road trip"', "Road trip", list.title
tc "songs -- empty at first", [], list.songs
list.add("Holiday").add("Drive")
tc 'add("Holiday").add("Drive")', ["Holiday", "Drive"], list.songs
uses(/attr_accessor\s+:title/, "attr_accessor")
avoids(/def\s+(title|songs)\b/, "hand-written getters and setters")
