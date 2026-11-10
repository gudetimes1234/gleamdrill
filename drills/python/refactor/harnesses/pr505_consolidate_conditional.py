need("disability_amount")


def person(seniority=5, months=3, part_time=False):
    return {"seniority": seniority, "months_disabled": months, "part_time": part_time, "salary": 3000}


tc("disability_amount(eligible)", 300.0, disability_amount(person()))
tc("disability_amount(seniority 1)", 0, disability_amount(person(seniority=1)))
tc("disability_amount(13 months disabled)", 0, disability_amount(person(months=13)))
tc("disability_amount(part time)", 0, disability_amount(person(part_time=True)))
tc("disability_amount(seniority 2, 12 months) -- on the boundary", 300.0, disability_amount(person(seniority=2, months=12)))
avoids(r"(?s)return 0\b.*return 0\b", "return 0 repeated for each check")
uses(r"\bor\b|\bany\(", "the checks joined with or")
