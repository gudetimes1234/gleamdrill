def hashtags(tags):
    out = ""
    for tag in tags:
        if out:
            out += " "
        out += "#" + tag
    return out
