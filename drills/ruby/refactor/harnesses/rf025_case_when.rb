need :day_kind

tc 'day_kind("sun")', "weekend", day_kind("sun")
tc 'day_kind("fri")', "almost", day_kind("fri")
tc 'day_kind("tue")', "weekday", day_kind("tue")
tc 'day_kind("xyz")', "unknown", day_kind("xyz")
uses(/\bcase\b/, "case")
avoids(/\belsif\b/, "elsif")
avoids(/==/, "== comparisons")
