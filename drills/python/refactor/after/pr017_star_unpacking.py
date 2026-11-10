def parse_row(row):
    name, *scores = row.split(",")
    return name, [int(score) for score in scores]
