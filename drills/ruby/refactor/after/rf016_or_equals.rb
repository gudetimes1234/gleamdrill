def with_defaults(options)
  options[:color] ||= "blue"
  options[:size] ||= 10
  options
end
