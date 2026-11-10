def shared_tags(a, b):
    shared = []
    for tag in a:
        for other in b:
            if tag == other and tag not in shared:
                shared.append(tag)
    return sorted(shared)
