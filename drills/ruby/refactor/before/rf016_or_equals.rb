def with_defaults(options)
  options[:color] = options[:color] || "blue"
  options[:size] = options[:size] || 10
  options
end
