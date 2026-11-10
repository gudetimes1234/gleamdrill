def positions(letters, target):
    found = []
    for i in range(len(letters)):
        if letters[i] == target:
            found.append(i)
    return found
