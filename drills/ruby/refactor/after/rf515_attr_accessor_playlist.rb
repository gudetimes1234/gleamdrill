class Playlist
  attr_accessor :title
  attr_reader :songs

  def initialize(title)
    @title = title
    @songs = []
  end

  def add(song)
    songs << song
    self
  end
end
