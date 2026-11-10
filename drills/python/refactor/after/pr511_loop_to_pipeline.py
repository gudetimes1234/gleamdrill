def india_offices(csv_text):
    lines = csv_text.strip().split("\n")[1:]
    rows = [[part.strip() for part in line.split(",")] for line in lines if line.strip()]
    return [{"city": city, "phone": phone} for city, country, phone in rows if country == "India"]
