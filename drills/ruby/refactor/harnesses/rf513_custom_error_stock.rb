need :reserve, :reserve_or_keep

tc 'reserve_or_keep({ "pen" => 2 }, "pen")', { "pen" => 1 }, reserve_or_keep({ "pen" => 2 }, "pen")
tc 'reserve_or_keep({ "pen" => 0 }, "pen") -- none left', { "pen" => 0 }, reserve_or_keep({ "pen" => 0 }, "pen")
tc 'reserve_or_keep({}, "ink") -- never stocked', {}, reserve_or_keep({}, "ink")
error = begin
  reserve({}, "ink")
  nil
rescue StandardError => e
  e
end
tc 'reserve({}, "ink") -- the message', "out of stock: ink", error&.message
tc "style: reserve raises its own error class", true, error.class != RuntimeError && error.class < StandardError
avoids(/\.message\b/, "matching on the message")
uses(/<\s*\w*Error\b|Class\.new\(\s*\w*Error\s*\)/, "an error class")
