def row_to_record(header, row):
    record = {}
    for i in range(len(header)):
        record[header[i]] = row[i]
    return record
