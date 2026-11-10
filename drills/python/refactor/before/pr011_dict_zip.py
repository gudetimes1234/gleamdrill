def make_record(headers, values):
    record = {}
    for i in range(len(headers)):
        record[headers[i]] = values[i]
    return record
