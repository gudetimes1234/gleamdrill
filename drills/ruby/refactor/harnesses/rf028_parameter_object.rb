need :readings_outside, :readings_inside

# Runs before and after the refactor: with a NumberRange if there is one,
# with min and max if not.
def bounded(name, readings, min, max)
  if defined?(NumberRange)
    send(name, readings, NumberRange.new(min:, max:))
  else
    send(name, readings, min, max)
  end
end

readings = [47, 53, 49, 58, 61]
tc "readings_outside(readings, 50..60)", [47, 49, 61], bounded(:readings_outside, readings, 50, 60)
tc "readings_inside(readings, 50..60)", [53, 58], bounded(:readings_inside, readings, 50, 60)
tc "readings_inside(readings, 60..60) -- inclusive", [], bounded(:readings_inside, readings, 60, 60)
uses(/NumberRange\s*=\s*(Data\.define|Struct\.new)|class NumberRange/, "a NumberRange parameter object")
tc "style: takes a range, not min and max", 2, method(:readings_outside).arity
