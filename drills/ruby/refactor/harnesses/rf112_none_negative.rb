need :valid_readings?

tc "valid_readings?([3.2, 0, 7])", true, valid_readings?([3.2, 0, 7])
tc "valid_readings?([3.2, -0.5])", false, valid_readings?([3.2, -0.5])
tc "valid_readings?([]) -- nothing bad in nothing", true, valid_readings?([])
uses(/\.none\?/, "none?")
avoids(/\.(select|filter|reject)\b/, "building an array first")
avoids(/\.(length|size|count)\s*==\s*0|\.empty\?/, "comparing a size to zero")
