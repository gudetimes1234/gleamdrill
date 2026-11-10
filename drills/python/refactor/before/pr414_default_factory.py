from dataclasses import dataclass


@dataclass
class Playlist:
    name: str
    songs: list = None

    def __post_init__(self):
        if self.songs is None:
            self.songs = []

    def add(self, song):
        self.songs.append(song)
        return len(self.songs)
