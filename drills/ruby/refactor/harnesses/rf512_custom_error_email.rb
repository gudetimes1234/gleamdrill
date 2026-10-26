need :check_email

tc 'check_email("Ada@Example.com")', "ada@example.com", check_email("Ada@Example.com")
tc 'check_email("@") -- just the at sign', "@", check_email("@")
error = begin
  check_email("nope")
  nil
rescue StandardError => e
  e
end
tc 'check_email("nope") -- the message', "invalid email: nope", error&.message
tc "style: check_email raises its own error class", true, error.class != RuntimeError && error.class < StandardError
uses(/<\s*\w*Error\b|Class\.new\(\s*\w*Error\s*\)/, "an error class")
avoids(/raise\s+[\w:]+\.new\b/, "Error.new(...) inside raise")
avoids(/RuntimeError/, "RuntimeError")
