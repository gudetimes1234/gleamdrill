def by_code(countries):
    codes = {}
    for name, code in countries.items():
        codes[code] = name
    return codes
