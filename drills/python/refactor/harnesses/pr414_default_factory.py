need("Playlist")


def not_shared():
    first = Playlist("a")
    first.add("x")
    return Playlist("b").songs


tc('repr(Playlist("road"))', "Playlist(name='road', songs=[])", repr(Playlist("road")))
tc('Playlist("d").add("q")', 1, Playlist("d").add("q"))
tc('Playlist("c", ["y"]).add("z")', 2, Playlist("c", ["y"]).add("z"))
tc("two playlists don't share songs", [], not_shared())
uses(r"default_factory\s*=", "field(default_factory=...)")
avoids(r"__post_init__", "__post_init__")
