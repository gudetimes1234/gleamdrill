def greet(name, opts = nil)
  opts ||= {}
  greeting = opts.fetch(:greeting, "Hello")
  mark = opts.fetch(:mark, "!")
  "#{greeting}, #{name}#{mark}"
end
