need :delivery_date if !defined?(rush_delivery_date)

split = defined?(rush_delivery_date) && defined?(regular_delivery_date)
rush = ->(order) { split ? rush_delivery_date(order) : delivery_date(order, true) }
regular = ->(order) { split ? regular_delivery_date(order) : delivery_date(order, false) }

tc "rush to MA", 11, rush.({ state: "MA", placed: 10 })
tc "rush to NY", 12, rush.({ state: "NY", placed: 10 })
tc "regular to CT", 12, regular.({ state: "CT", placed: 10 })
tc "regular to NY", 13, regular.({ state: "NY", placed: 10 })
tc "style: rush_delivery_date and regular_delivery_date", true, split ? true : false
uses(/%w\[|\.include\?/, "a list lookup for the near states")
