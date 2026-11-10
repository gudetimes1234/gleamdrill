class override:
    def __init__(self, settings, key, value):
        self.settings = settings
        self.key = key
        self.value = value

    def __enter__(self):
        self.old = self.settings[self.key]
        self.settings[self.key] = self.value
        return self.settings

    def __exit__(self, *exc_info):
        self.settings[self.key] = self.old
        return False
