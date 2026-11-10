def india_offices(csv_text):
    result = []
    first = True
    for line in csv_text.strip().split("\n"):
        if first:
            first = False
            continue
        if not line.strip():
            continue
        city, country, phone = line.split(",")
        if country.strip() == "India":
            result.append({"city": city.strip(), "phone": phone.strip()})
    return result
