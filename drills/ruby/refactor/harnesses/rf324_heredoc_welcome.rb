need :welcome_email

tc 'welcome_email("Ann", "Pro")', "Hi Ann,\n\nThanks for choosing the Pro plan.\nReply to this email if you need help.\n", welcome_email("Ann", "Pro")
tc 'welcome_email("", "Free") -- empty name', "Hi ,\n\nThanks for choosing the Free plan.\nReply to this email if you need help.\n", welcome_email("", "Free")
uses(/<<~/, "a <<~ heredoc")
avoids(/\.join\b/, "join")
avoids(/\\n/, "\\n escapes")
