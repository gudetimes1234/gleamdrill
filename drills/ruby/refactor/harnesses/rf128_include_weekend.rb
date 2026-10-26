need :weekend?

tc 'weekend?("Sun")', true, weekend?("Sun")
tc 'weekend?("Mon")', false, weekend?("Mon")
tc 'weekend?("sat") -- case matters', false, weekend?("sat")
tc "weekend?(nil)", false, weekend?(nil)
uses(/\.include\?/, "include?")
avoids(/==/, "chained ==")
avoids(/\|\|/, "||")
