def clean(tag):
    return tag.strip().lower()


def tags(raw):
    return [c for t in raw if (c := clean(t))]
