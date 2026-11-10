from dataclasses import dataclass, field


@dataclass
class Playlist:
    name: str
    songs: list = field(default_factory=list)

    def add(self, song):
        self.songs.append(song)
        return len(self.songs)
