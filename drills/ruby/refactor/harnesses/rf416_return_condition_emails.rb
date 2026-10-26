need :valid_email?

tc 'valid_email?("ada@example.com")', true, valid_email?("ada@example.com")
tc 'valid_email?("ada.example.com")', false, valid_email?("ada.example.com")
tc 'valid_email?("ada@example.net")', false, valid_email?("ada@example.net")
tc 'valid_email?("")', false, valid_email?("")
avoids(/\btrue\b|\bfalse\b/, "true/false literals")
avoids(/\bif\b/, "if around a boolean")
