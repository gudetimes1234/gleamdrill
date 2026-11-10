need("with_overrides")
tc("with_overrides({'color': 'red', 'size': 'M'}, {'size': 'L'})", {"color": "red", "size": "L"}, with_overrides({"color": "red", "size": "M"}, {"size": "L"}))
tc("with_overrides({'a': 1}, {'b': 2}) -- new keys go last", {"a": 1, "b": 2}, with_overrides({"a": 1}, {"b": 2}))
tc("with_overrides({}, {})", {}, with_overrides({}, {}))
base = {"a": 1}
with_overrides(base, {"a": 2})
tc("with_overrides(base, {'a': 2}) leaves base alone", {"a": 1}, base)
uses(r"\w\s*\|\s*\w|\{\s*\*\*", "a | merge or {**a, **b}")
avoids(r"\bfor\b", "a loop copying keys")
