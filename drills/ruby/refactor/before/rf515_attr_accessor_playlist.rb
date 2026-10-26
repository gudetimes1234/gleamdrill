class Playlist
  def initialize(title)
    @title = title
    @songs = []
  end

  def title
    @title
  end

  def title=(new_title)
    @title = new_title
  end

  def songs
    @songs
  end

  def add(song)
    @songs << song
    self
  end
end
