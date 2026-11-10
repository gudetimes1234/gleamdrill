def display_name(raw):
    words = []
    for word in raw.split():
        words.append(word[0].upper() + word[1:].lower())
    return " ".join(words)
