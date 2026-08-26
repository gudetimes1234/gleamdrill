try:
    (TimeMap)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

__store__ = TimeMap()
__store__.set("foo", "bar", 1)

__case__("get('foo', 1) after set at 1", "bar", __store__.get("foo", 1))
__case__("get('foo', 3) with only the value at 1", "bar", __store__.get("foo", 3))

__store__.set("foo", "bar2", 4)

__case__("get('foo', 4) after set at 4", "bar2", __store__.get("foo", 4))
__case__("get('foo', 5) after set at 4", "bar2", __store__.get("foo", 5))
__case__("get('foo', 3) still sees the older value", "bar", __store__.get("foo", 3))
__case__("get('foo', 0) before anything was set", "", __store__.get("foo", 0))
__case__("get('missing', 1)", "", __store__.get("missing", 1))
