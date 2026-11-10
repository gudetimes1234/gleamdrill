def parse_row(row):
    parts = row.split(",")
    name = parts[0]
    scores = parts[1:]
    return name, [int(score) for score in scores]
