def passing(scores):
    result = []
    for score in scores:
        if score >= 50:
            result.append(score)
    return result
