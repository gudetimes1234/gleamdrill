def countdown(from)
  from.downto(1).map { |n| "#{n}..." } + ["liftoff"]
end
