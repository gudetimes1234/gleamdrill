def clean(tag):
    return tag.strip().lower()


def tags(raw):
    return [clean(t) for t in raw if clean(t)]
